import messageService from "../services/messages";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const MessagesPage = ({ user }) => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messageService.getThread(userId).then((messages) => {
      setMessages(messages);
    });
  }, [userId]);

  if (!user) return <div>Please log in to view messages.</div>;

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx}>{msg.content || JSON.stringify(msg)}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessagesPage;
