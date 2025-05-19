const ExchangeRequest = require("../models/exchangerequest");
const exchangeRequestsRouter = require("express").Router();
const middleware = require("../utils/middleware");

exchangeRequestsRouter.post(
  "/",
  middleware.userExtractor,
  async (req, res, next) => {
    try {
      const { toUser, skillsOffered, skillsWanted } = req.body;
      const fromUser = req.user._id;

      // Validate input
      if (
        !toUser ||
        !skillsOffered ||
        !skillsWanted ||
        !skillsOffered.length ||
        !skillsWanted.length
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const newRequest = new ExchangeRequest({
        fromUser,
        toUser,
        skillsOffered,
        skillsWanted,
      });

      const savedRequest = await newRequest.save();
      res.status(201).json(savedRequest);
    } catch (error) {
      next(error);
    }
  }
);

exchangeRequestsRouter.get(
  "/",
  middleware.userExtractor,
  async (req, res, next) => {
    try {
      const userId = req.user._id;

      const exchangeRequests = await ExchangeRequest.find({
        $or: [{ fromUser: userId }, { toUser: userId }],
      })
        .populate("fromUser", "username name")
        .populate("toUser", "username name");

      res.json(exchangeRequests);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = exchangeRequestsRouter;
