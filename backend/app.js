const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const registerRouter = require("./controllers/register");
const exchangeRequestsRouter = require("./controllers/exchangeRequests");
const matchesRouter = require("./controllers/matches");
const messagesRouter = require("./controllers/messages");
const reviewsRouter = require("./controllers/reviews");
const middleware = require("./utils/middleware");
const cors = require("cors");
const path = require("path");

const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

app.use(express.json());
app.use(cors());

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/exchange-requests", exchangeRequestsRouter);
app.use("/api/matches", matchesRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/reviews", reviewsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

app.use(middleware.errorHandler);

module.exports = app;
