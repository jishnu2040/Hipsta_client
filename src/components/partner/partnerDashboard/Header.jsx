import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaRegMessage } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { toast } from 'react-toastify';
import ThemeContext from '../../../ThemeContext';
import avatarImage from '../../../assets/man.png';

const Header = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user ? user.name : 'Guest';

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // WebSocket for real-time notifications
    let socket;
  
    const connectSocket = () => {
      socket = new WebSocket(`ws://localhost:8000/ws/notifications/`);
  
      socket.onopen = () => console.log('WebSocket connection established');
  
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.message) {
            toast.success(data.message);
  
            setNotifications((prev) => {
              // Avoid duplicates based on message or id
              if (!prev.some((n) => n.message === data.message)) {
                return [
                  ...prev,
                  { id: Date.now(), message: data.message, created_at: new Date().toLocaleString() },
                ];
              }
              return prev;
            });
  
            setUnreadCount((prev) => prev + 1);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
  
      socket.onclose = () => {
        console.log('WebSocket closed. Reconnecting...');
        setTimeout(connectSocket, 5000);
      };
  
      socket.onerror = (error) => console.error('WebSocket error:', error);
    };
  
    connectSocket();
  
    // Cleanup WebSocket on component unmount or before reconnecting
    return () => {
      if (socket) {
        socket.close();
        console.log('WebSocket connection closed');
      }
    };
  }, []);
  

  const handleNotificationClick = () => {
    setUnreadCount(0);
    setShowNotifications((prev) => !prev);
  };


  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate("/partner/profile");
  }; 

  
  return (
    <header
      className={`flex items-center justify-between px-2 py-3 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}
    >
        <div>
          <span className="hidden sm:block text-lg font-semibold">🚀 Welcome back 🎀{username}</span>
        </div>

      <div className="flex">
        <button className="relative p-2 rounded-lg  hover:bg-gray-200">
        <FaBell className="text-xl"/>
        </button>
        <button
          onClick={handleNotificationClick}
          className="relative p-2 rounded-lg  hover:bg-gray-200"
        >
          <FaRegMessage className="text-xl" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
        

        {showNotifications && (
          <div
            className={`absolute right-0 mt-2 w-64 max-h-60 overflow-y-auto border rounded-lg shadow-lg ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
          >
            <ul>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="p-3 text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <div>{notification.message}</div>
                    <div className="text-xs text-gray-500">{notification.created_at}</div>
                  </li>
                ))
              ) : (
                <li className="p-3 text-sm text-gray-500">No notifications</li>
              )}
            </ul>
          </div>
        )}

        <div className="flex items-center">
          <img
            src={avatarImage}
            alt="User Avatar"
            className="w-10 h-10 mx-4 rounded-full border-2 border-gray-300 shadow-md cursor-pointer"
            onClick={handleAvatarClick} // Redirect on click
          />
        </div>
      </div>
     
    </header>
  );
};

export default Header;
