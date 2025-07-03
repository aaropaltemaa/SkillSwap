const app = require("./app");
const config = require("./utils/config");
const logger = require("./utils/logger");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});

// Socket.IO event handling
io.on("connection", (socket) => {
  logger.info("A user connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    logger.info(`User ${userId} joined their room`);
  });

  socket.on("disconnect", () => {
    logger.info("User disconnected:", socket.id);
  });
});

app.set("io", io);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
