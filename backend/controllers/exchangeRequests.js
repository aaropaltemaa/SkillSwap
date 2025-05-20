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

exchangeRequestsRouter.put(
  "/:id/status",
  middleware.userExtractor,
  async (req, res) => {
    const user = req.user._id;
    const { status } = req.body;

    const requestId = req.params.id;

    const validStatuses = ["accepted", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const exchangeRequest = await ExchangeRequest.findById(requestId);
    if (!exchangeRequest) {
      return res.status(404).json({ error: "Exchange request not found" });
    }

    if (exchangeRequest.toUser.toString() !== user.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this request" });
    }

    exchangeRequest.status = status;
    await exchangeRequest.save();

    res.json(exchangeRequest);
  }
);

exchangeRequestsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (req, res) => {
    const user = req.user._id;
    const requestId = req.params.id;

    const exchangeRequest = await ExchangeRequest.findById(requestId);
    if (!exchangeRequest) {
      return res.status(404).json({ error: "Exchange request not found" });
    }

    if (
      exchangeRequest.fromUser.toString() !== user.toString() &&
      exchangeRequest.toUser.toString() !== user.toString()
    ) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this request" });
    }

    await ExchangeRequest.findByIdAndDelete(requestId);
    res.status(204).end();
  }
);

module.exports = exchangeRequestsRouter;
