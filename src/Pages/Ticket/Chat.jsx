import React, { useEffect, useState, useRef } from 'react';

const Chat = ({ ticketId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef(null);
  const messagesEndRef = useRef(null);

  // WebSocket connection for chat
  useEffect(() => {
    socket.current = new WebSocket(`ws://localhost:8000/ws/chat/${ticketId}/`);

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    return () => {
      socket.current.close();
    };
  }, [ticketId]); 

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send message handler
  const sendMessage = () => {
    if (newMessage.trim()) {
      socket.current.send(JSON.stringify({ message: newMessage }));
      setNewMessage('');
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-w-3xl mx-auto">
      <div className="h-96 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="font-semibold text-blue-600">{msg.sender}:</div>
            <div className="bg-gray-200 p-3 rounded-md shadow-sm">{msg.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="p-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;