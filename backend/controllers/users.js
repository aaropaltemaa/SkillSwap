const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");
const middleware = require("../utils/middleware");

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

usersRouter.get("/me", middleware.userExtractor, async (req, res) => {
  const user = req.user;
  res.json({
    id: user._id,
    username: user.username,
    name: user.name,
    email: user.email,
    skillsOffered: user.skillsOffered,
    skillsWanted: user.skillsWanted,
    bio: user.bio,
    location: user.location,
  });
});

usersRouter.put("/me", middleware.userExtractor, async (req, res) => {
  const userId = req.user._id;
  const updates = req.body;

  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });

  res.json(updatedUser);
});

module.exports = usersRouter;
