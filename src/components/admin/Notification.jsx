import React, { useState } from 'react';
import axios from 'axios';

const Notification = () => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/notification/create/', {
        message,
      });
      setStatus('Notification created successfully!');
      setMessage(''); // Reset the input field
    } catch (error) {
      setStatus('Failed to create notification.');
    }
  };

  return (
    <div>
      <h2>Create Notification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default Notification;
