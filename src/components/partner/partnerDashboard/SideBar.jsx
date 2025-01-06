import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarAlt, FaBook, FaUsers, FaBell, FaClock, FaHeadset } from 'react-icons/fa';
import ThemeContext from '../../../ThemeContext';
import avatarImage from '../../../assets/man.png';
import { toast } from 'react-toastify';



const SideBar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user ? user.name : 'Guest';

  const data = [
    { title: 'Dashboard', link: '/partner', icon: <FaTachometerAlt /> },
    { title: 'Calendar', link: '/partner/calendar', icon: <FaCalendarAlt /> },
    { title: 'Catalog', link: '/partner/catalog', icon: <FaBook /> },
    { title: 'Team', link: '/partner/team', icon: <FaUsers /> },
    { title: 'Profile', link: '/partner/profile', icon: <FaUsers /> },
    { title: 'Employee Availability', link: '/employeeAvailability', icon: <FaClock /> },
    { title: 'Help Center', link: '/helpdesk/tickets', icon: <FaHeadset /> },
  ];

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Fetch previous notifications
    fetch('http://localhost:8000/api/v1/notification/list') // Adjust URL as needed
      .then((response) => response.json())
      .then((data) => {
        // Map notifications to a simplified structure
        const formattedNotifications = data.map((notification) => ({
          id: notification.id,
          message: notification.message,
          created_at: new Date(notification.created_at).toLocaleString(), // Convert to a readable format
        }));
        setNotifications(formattedNotifications); // Set formatted notifications
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  
    // WebSocket for new notifications
    let socket = new WebSocket(`ws://localhost:8000/ws/notifications/`);
  
    const connectSocket = () => {
      socket = new WebSocket(`ws://localhost:8000/ws/notifications/`);
  
      socket.onopen = () => {
        console.log('WebSocket connection established');
      };
  
      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.message) {
            toast.success(data.message); // Show a toast notification
            setNotifications((prev) => [
              ...prev,
              { message: data.message, created_at: new Date().toLocaleString(-1) }, 
            ]);
            setUnreadCount((prev) => prev + 1);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
  
      socket.onclose = () => {
        console.log('WebSocket closed. Reconnecting...');
        setTimeout(connectSocket, 5000); // Reconnect after 5 seconds
      };
  
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };
  
    connectSocket();
  
    return () => socket.close(); // Cleanup socket connection on component unmount
  }, []);
  

  const handleNotificationClick = () => {
    setUnreadCount(0);
    setShowNotifications((prev) => !prev); // Toggle notification dropdown
  };

  return (
    <div className={`w-full h-full flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-all duration-300`}>
      <div className="flex items-center px-2 py-2 mb-6">
        <img
          src={avatarImage}
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-md"
        />
        <div className="ml-4 flex-1">
          <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{username}</h1>
        </div>
        <div className="relative">
          <button
            onClick={handleNotificationClick}
            className="relative p-2 ml-4 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          >
            <FaBell className="text-gray-600 w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
              {showNotifications && (
                <div
                  className={`absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg ${
                    isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}
                >
                  <ul className="max-h-60 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <li
                          key={notification.id} // Use the unique 'id' for the key
                          className={`p-3 text-sm hover:bg-gray-200 dark:hover:bg-gray-700 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-800'
                          }`}
                        >
                          <div>{notification.message}</div>
                          <div className="text-xs text-gray-500">{notification.created_at}</div> {/* Show creation date */}
                        </li>
                      ))
                    ) : (
                      <li className="p-3 text-sm text-gray-500">No notifications</li>
                    )}
                  </ul>
                </div>
              )}

        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow px-2">
        {data.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className={`flex items-center space-x-3 p-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-blue-600 hover:text-white ${
              isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Theme Toggle Button */}
      <div className="px-6 pb-4">
        <button
          onClick={toggleTheme}
          className={`flex items-center justify-between w-full p-3 rounded-lg ${
            isDarkMode ? 'bg-blue-500' : 'bg-gray-300'
          } transition-all duration-300`}
        >
          <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {isDarkMode ? 'Dark Mode' : 'Light Mode'}
          </span>
          <div
            className={`relative w-10 h-5 rounded-full ${isDarkMode ? 'bg-blue-600' : 'bg-gray-400'}`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                isDarkMode ? 'transform translate-x-5' : ''
              }`}
            ></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
