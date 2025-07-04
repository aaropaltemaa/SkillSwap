import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ user, children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) return;

    // Use environment variable or fallback to localhost
    const backendUrl =
      import.meta.env.VITE_SOCKET_IO_URL || "http://localhost:3001";

    const s = io(backendUrl, {
      transports: ["websocket"], // optional, but can help with CORS issues
    });
    s.emit("join", user.id);
    setSocket(s);

    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
