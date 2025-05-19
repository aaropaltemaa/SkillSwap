const messagesRouter = require("express").Router();
const Message = require("../models/message");
const middleware = require("../utils/middleware");

messagesRouter.post("/", middleware.userExtractor, async (req, res) => {
  const sender = req.user._id;
  const { receiver, content } = req.body;

  if (!receiver || !content.trim()) {
    return res
      .status(400)
      .json({ error: "receiver doesn't exist or content is empty" });
  }

  const newMessage = new Message({
    sender,
    receiver,
    content,
  });

  const savedMessage = await newMessage.save();
  res.status(201).json(savedMessage);
});

module.exports = messagesRouter;
