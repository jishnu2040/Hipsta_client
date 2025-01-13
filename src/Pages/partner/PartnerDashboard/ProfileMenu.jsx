import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaBuilding, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utlils/axiosinstance';
import ThemeContext from '../../../ThemeContext';

const ProfileMenu = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext); // Accessing dark mode context
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Detect mobile view

  // Update state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      toast.error('No refresh token found');
      navigate('/login');
      return;
    }

    try {
      const res = await axiosInstance.post('/auth/logout/', {
        refresh_token: refreshToken,
      });

      if (res.status === 204) {
        localStorage.clear();
        navigate('/'); // Redirect to homepage or login page
        toast.success('Logout successful');
      }
    } catch (error) {
      toast.error('Logout failed. Please try again.');
    }
  };

  const data = [
    { title: 'My Profile', link: '/partner/profile', icon: <FaUser /> },
    { title: 'Workplace', link: '/partner/profile/workplace', icon: <FaBuilding /> },
    { title: 'Settings', link: '/partner/profile/settings', icon: <FaCog /> },
    { title: 'Logout', link: '#', icon: <FaSignOutAlt />, action: handleLogout },
  ];

  return (
    <div
      className={`w-full h-full flex ${
        isMobile ? 'flex-row justify-evenly items-center py-2' : 'flex-col justify-center rounded-lg shadow-md p-4'
      } ${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'}`}
    >
      {isMobile ? (
        // Mobile View: Display only icons in a row
        <>
          {data.map((item) => (
            <div key={item.title} className="p-2">
              {item.link === '#' ? (
                <button
                  onClick={item.action}
                  className={`text-2xl ${
                    isDarkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  title={item.title}
                >
                  {item.icon}
                </button>
              ) : (
                <Link
                  to={item.link}
                  className={`text-2xl ${
                    isDarkMode ? 'text-gray-200 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'
                  }`}
                  title={item.title}
                >
                  {item.icon}
                </Link>
              )}
            </div>
          ))}
        </>
      ) : (
        // Desktop View: Display full menu
        <>
          {/* Heading */}
          <div className="mt-32">
            <h2 className="text-lg font-bold">Your Account</h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow space-y-2 p-4">
            {data.map((item) => (
              <div
                key={item.title}
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition duration-200 ease-in-out ${
                  isDarkMode ? 'hover:bg-gray-700 hover:text-blue-400' : ''
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.link === '#' ? (
                  <button
                    onClick={item.action}
                    className={`text-base font-medium w-full text-left ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    {item.title}
                  </button>
                ) : (
                  <Link
                    to={item.link}
                    className={`text-base font-medium w-full text-left ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </>
      )}
    </div>
  );
};

export default ProfileMenu;
