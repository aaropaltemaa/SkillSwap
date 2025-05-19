const middleware = require("../utils/middleware");
const matchesRouter = require("express").Router();
const User = require("../models/user");

matchesRouter.get("/", middleware.userExtractor, async (req, res) => {
  const matches = await User.find({
    skillsOffered: { $in: req.user.skillsWanted },
    skillsWanted: { $in: req.user.skillsOffered },
    _id: { $ne: req.user._id },
  });

  res.json(matches);
});

module.exports = matchesRouter;
