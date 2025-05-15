const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (req, res, next) => {
  try {
    const {
      username,
      name,
      email,
      password,
      bio,
      skillsOffered,
      skillsWanted,
      location,
      matches,
    } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: "username, password or email missing" });
    }

    if (password.length < 3) {
      return res
        .status(400)
        .json({ error: "password must be at least three characters" });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      email,
      passwordHash,
      bio,
      skillsOffered,
      skillsWanted,
      location,
      matches,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = usersRouter;
