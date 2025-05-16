const bcrypt = require("bcryptjs");
const registerRouter = require("express").Router();
const User = require("../models/user");
const dotenv = require("dotenv");

dotenv.config();

registerRouter.post("/", async (req, res) => {
  const { username, name, email, password } = req.body;

  if (!password || !username || !email || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ error: "Email already in use" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: savedUser._id,
      username: savedUser.username,
      name: savedUser.name,
      email: savedUser.email,
    },
  });
});

module.exports = registerRouter;
