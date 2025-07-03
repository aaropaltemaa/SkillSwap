import { useEffect } from "react";
import { io } from "socket.io-client";

const SocketTest = () => {
  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      console.log("Socket.IO connected!", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket.IO disconnected");
    });

    // Clean up on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>Socket.IO test component loaded (check console)</div>;
};

export default SocketTest;
