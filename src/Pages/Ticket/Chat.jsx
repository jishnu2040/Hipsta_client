import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const Chat = ({ ticketId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const reconnectAttempts = useRef(0);

  const API_BASE_URL = 'https://api.hipsta.live/api/v1/';
  const WS_BASE_URL = 'wss://api.hipsta.live/ws/chat/';

  // Fetch initial chat messages
  useEffect(() => {
    const token = localStorage.getItem('access_token');

    axios
      .get(`${API_BASE_URL}ticket/${ticketId}/chatmessages/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setMessages(response.data))
      .catch((error) => console.error('Error fetching chat messages:', error));

    connectWebSocket(token);

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [ticketId]);

  // WebSocket connection with automatic reconnection
  const connectWebSocket = (token) => {
    socket.current = new WebSocket(`${WS_BASE_URL}${ticketId}/?token=${token}`);

    socket.current.onopen = () => {
      console.log('WebSocket connected');
      setSocketConnected(true);
      reconnectAttempts.current = 0;
    };

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.current.onclose = () => {
      console.log('WebSocket disconnected');
      setSocketConnected(false);

      if (reconnectAttempts.current < 5) {
        setTimeout(() => {
          reconnectAttempts.current += 1;
          console.log(`Reconnecting... Attempt ${reconnectAttempts.current}`);
          connectWebSocket(token);
        }, 3000);
      }
    };
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim() && socket.current && socketConnected) {
      const messageData = {
        type: 'chat.message',
        message: newMessage,
        sender: 'User', // Replace with actual sender username
      };
      socket.current.send(JSON.stringify(messageData));
      setNewMessage('');
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-w-3xl mx-auto">
      <div className="h-96 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="flex justify-start">
            <div className="font-semibold text-blue-600 mr-2">{msg.sender}:</div>
            <div className="bg-gray-200 p-3 rounded-md shadow-sm max-w-xs">
              {msg.message}
            </div>
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
          className={`p-3 ${socketConnected ? 'bg-blue-500' : 'bg-gray-400'} text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none`}
          disabled={!socketConnected}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
