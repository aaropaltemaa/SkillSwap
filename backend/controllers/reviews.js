const middleware = require("../utils/middleware");
const reviewsRouter = require("express").Router();
const Review = require("../models/review");
const User = require("../models/user");
const ExchangeRequest = require("../models/exchangerequest");

reviewsRouter.post(
  "/",
  middleware.userExtractor,
  async (req, res, next) => {
    try {
      const reviewer = req.user._id;
      const { reviewee, exchange, rating, comment } = req.body;

      if (!reviewee || !rating || !comment) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Prevent duplicate reviews for the same exchange by the same reviewer
      if (exchange) {
        const existing = await Review.findOne({ reviewer, exchange });
        if (existing) {
          return res.status(400).json({ error: "You have already reviewed this exchange" });
        }
      }

      // Check that reviewee exists
      const revieweeUser = await User.findById(reviewee);
      if (!revieweeUser) {
        return res.status(404).json({ error: "Reviewee not found" });
      }

      // Check that exchange exists and involves both users
      if (exchange) {
        const exch = await ExchangeRequest.findById(exchange);
        if (
          !exch ||
          (exch.fromUser.toString() !== reviewer.toString() &&
            exch.toUser.toString() !== reviewer.toString())
        ) {
          return res.status(400).json({ error: "Invalid exchange" });
        }
      }

      const newReview = new Review({
        reviewer,
        reviewee,
        exchange,
        rating,
        comment,
      });

      const savedReview = await newReview.save();
      res.status(201).json(savedReview);
    } catch (error) {
      next(error);
    }
  }
);

// Get all reviews for a user (as reviewee)
reviewsRouter.get(
  "/user/:userId",
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const reviews = await Review.find({ reviewee: userId })
        .populate("reviewer", "username name")
        .populate("exchange");
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }
);

// Get all reviews written by a user (as reviewer)
reviewsRouter.get(
  "/reviewer/:userId",
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const reviews = await Review.find({ reviewer: userId })
        .populate("reviewee", "username name")
        .populate("exchange");
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }
);

// Get all reviews for a specific exchange
reviewsRouter.get(
  "/exchange/:exchangeId",
  async (req, res, next) => {
    try {
      const { exchangeId } = req.params;
      const reviews = await Review.find({ exchange: exchangeId })
        .populate("reviewer", "username name")
        .populate("reviewee", "username name");
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = reviewsRouter;