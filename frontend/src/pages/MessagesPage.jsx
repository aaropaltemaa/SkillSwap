import messageService from "../services/messages";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import userService from "../services/users";
import { useSocket } from "../components/SocketProvider";

const MessagesPage = ({ user }) => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [partner, setPartner] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const socket = useSocket();

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError("");
    // Fetch partner info and messages
    userService.getAll().then((users) => {
      const found = users.find((u) => u.id === userId);
      setPartner(found);
    });
    messageService
      .getThread(userId)
      .then((msgs) => {
        setMessages(msgs);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load messages.");
        setLoading(false);
      });
  }, [user, userId]);

  // Real-time: Listen for new messages
  useEffect(() => {
    if (!socket || !user) return;

    const handleNewMessage = (msg) => {
      // Only add if the message is for this thread and not already present
      if (
        ((msg.sender === user.id && msg.receiver === userId) ||
          (msg.sender === userId && msg.receiver === user.id)) &&
        !messages.some((m) => m.id === msg.id)
      ) {
        setMessages((msgs) => [...msgs, msg]);
      }
    };

    socket.on("new_message", handleNewMessage);
    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [socket, user, userId, messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    try {
      await messageService.sendMessage({
        receiver: userId,
        content: newMessage,
      });
      setNewMessage("");
    } catch {
      setError("Failed to send message.");
    }
  };

  if (!user) return <div>Please log in to view messages.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        Chat with {partner ? partner.username : "User"}
      </h2>
      <div className="h-96 overflow-y-auto mb-4 bg-gray-50 rounded p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 flex ${msg.sender === user.id ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                msg.sender === user.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <div className="text-sm">{msg.content}</div>
              <div className="text-xs text-gray-400 text-right">
                {msg.timestamp
                  ? new Date(msg.timestamp).toLocaleTimeString()
                  : ""}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          className="flex-1 border rounded-lg px-3 py-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessagesPage;
