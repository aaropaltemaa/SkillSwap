import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ user, children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) return;

    // Use local development URL when in development
    const socketUrl = import.meta.env.DEV
      ? "http://localhost:3001"
      : import.meta.env.VITE_SOCKET_URL;

    const s = io(socketUrl);
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
