const messagesRouter = require("express").Router();
const Message = require("../models/message");
const User = require("../models/user");
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

messagesRouter.get("/threads", middleware.userExtractor, async (req, res) => {
  const loggedInUser = req.user._id;

  const messages = await Message.find({
    $or: [{ sender: loggedInUser }, { receiver: loggedInUser }],
  }).sort({ timestamp: -1 });

  const conversations = {};

  for (const message of messages) {
    const senderId = message.sender.toString();
    const receiverId = message.receiver.toString();

    const otherUserId =
      senderId === loggedInUser.toString() ? receiverId : senderId;

    if (!conversations[otherUserId]) {
      conversations[otherUserId] = message;
    }
  }

  const otherUserIds = Object.keys(conversations);

  const users = await User.find({ _id: { $in: otherUserIds } }).select(
    "name email skillsOffered skillsWanted"
  );

  const threads = users.map((user) => {
    const lastMessage = conversations[user._id.toString()];
    return {
      user,
      lastMessage,
    };
  });

  res.json(threads);
});

messagesRouter.get("/:userId", middleware.userExtractor, async (req, res) => {
  const loggedInUser = req.user._id;
  const otherUser = req.params.userId;

  const messages = await Message.find({
    $or: [
      { sender: loggedInUser, receiver: otherUser },
      { sender: otherUser, receiver: loggedInUser },
    ],
  }).sort({ timestamp: 1 });
  res.json(messages);
});

module.exports = messagesRouter;
