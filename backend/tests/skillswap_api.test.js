const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("node:assert");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { usersInDb } = require("./test_helper");
const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", name: "Root User", email: "root@example.com", passwordHash });
  await user.save();
});

test("users are returned as json", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect('Content-Type', /application\/json/)

    
})

test("a valid user can be registered", async () => {
  const newUser = {
    username: "testuser",
    name: "Test User",
    email: "test@example.com",
    password: "password123"
  };

  await api
    .post("/api/register")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await usersInDb();
  assert.strictEqual(usersAtEnd.length, 2);
  assert(usersAtEnd.some(u => u.username === "testuser"));
});

test("login succeeds with correct credentials", async () => {
  const loginDetails = {
    username: "root",
    password: "sekret"
  };

  const response = await api
    .post("/api/login")
    .send(loginDetails)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert(response.body.token);
});

test("registration fails with duplicate username", async () => {
  const newUser = {
    username: "root",
    name: "Another User",
    email: "another@example.com",
    password: "anotherpassword"
  };

  const response = await api
    .post("/api/register")
    .send(newUser)
    .expect(400);

  assert.match(response.body.error, /Username already exists/);
});

test("registration fails with short password", async () => {
  const newUser = {
    username: "shortpass",
    name: "Short Pass",
    email: "short@example.com",
    password: "pw"
  };

  const response = await api
    .post("/api/register")
    .send(newUser)
    .expect(400);

  // Either controller can return a generic or specific error
  assert(
    response.body.error.includes("password") ||
    response.body.error.includes("at least")
  );
});

test("login fails with wrong password", async () => {
  const loginDetails = {
    username: "root",
    password: "wrongpassword"
  };

  const response = await api
    .post("/api/login")
    .send(loginDetails)
    .expect(401);

  assert.match(response.body.error, /invalid username or password/);
});

test("user can be deleted after login", async () => {
  // Login to get token
  const loginRes = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" });

  const token = loginRes.body.token;
  assert(token);

  await api
    .delete("/api/users/me")
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const usersAtEnd = await usersInDb();
  assert.strictEqual(usersAtEnd.length, 0);
});

test("user can create an exchange request", async () => {
  // Register and login a second user
  const user2 = {
    username: "user2",
    name: "User Two",
    email: "user2@example.com",
    password: "password456"
  };
  await api.post("/api/register").send(user2);

  // Login as root user
  const loginRes = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" });
  const token = loginRes.body.token;

  // Get user2's id
  const users = await api.get("/api/users");
  const user2Id = users.body.find(u => u.username === "user2").id;

  const exchangeRequest = {
    toUser: user2Id,
    skillsOffered: ["guitar"],
    skillsWanted: ["french"]
  };

  const res = await api
    .post("/api/exchange-requests")
    .set("Authorization", `Bearer ${token}`)
    .send(exchangeRequest)
    .expect(201);

  // Check response
  assert.strictEqual(res.body.toUser, user2Id);
  assert.deepStrictEqual(res.body.skillsOffered, ["guitar"]);
  assert.deepStrictEqual(res.body.skillsWanted, ["french"]);
});

test("user cannot create exchange request with missing fields", async () => {
  // Login as root user
  const loginRes = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" });
  const token = loginRes.body.token;

  const badRequest = {
    // missing toUser, skillsOffered, skillsWanted
  };

  const res = await api
    .post("/api/exchange-requests")
    .set("Authorization", `Bearer ${token}`)
    .send(badRequest)
    .expect(400);

  assert(res.body.error.includes("Missing required fields"));
});

test("user can view their exchange requests", async () => {
  // Login as root user
  const loginRes = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" });
  const token = loginRes.body.token;

  const res = await api
    .get("/api/exchange-requests")
    .set("Authorization", `Bearer ${token}`)
    .expect(200);

  assert(Array.isArray(res.body));
});

test("user cannot update exchange request status if not recipient", async () => {
  // Register and login a second user
  const user2 = {
    username: "user2",
    name: "User Two",
    email: "user2@example.com",
    password: "password456"
  };
  await api.post("/api/register").send(user2);

  // Login as root user and create request to user2
  const loginRes1 = await api
    .post("/api/login")
    .send({ username: "root", password: "sekret" });
  const token1 = loginRes1.body.token;

  const users = await api.get("/api/users");
  const user2Id = users.body.find(u => u.username === "user2").id;

  const exchangeRequest = {
    toUser: user2Id,
    skillsOffered: ["guitar"],
    skillsWanted: ["french"]
  };

  const reqRes = await api
    .post("/api/exchange-requests")
    .set("Authorization", `Bearer ${token1}`)
    .send(exchangeRequest);

  // Login as root user (not recipient) and try to update status
  const res = await api
    .put(`/api/exchange-requests/${reqRes.body.id}/status`)
    .set("Authorization", `Bearer ${token1}`)
    .send({ status: "accepted" })
    .expect(403);

  assert(res.body.error.includes("Not authorized"));
});

after(async () => {
  await mongoose.connection.close();
});
