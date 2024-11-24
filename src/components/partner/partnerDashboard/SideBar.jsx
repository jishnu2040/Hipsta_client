import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarAlt, FaBook, FaUsers, FaBell, FaClock } from 'react-icons/fa';
import ThemeContext from '../../../ThemeContext';
import avatarImage from '../../../assets/man.png';

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
    { title: 'Schedule', link: '/partner/availabilitylist', icon:<FaClock /> }
  ];

  return (
    <div className={`w-full h-full flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-all duration-300 rounded-xl shadow-lg`}>

      <div className="flex items-center px-2 py-2 mb-6 ">
        <img
          src={avatarImage}
          alt="User Avatar"
          className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-md"
        />
        <div className="ml-4 flex-1">
          <h1 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{username}</h1>
        </div>
        <button className="relative p-2 ml-4 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
          <FaBell className="text-gray-600 w-6 h-6" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow px-2 ">
        {data.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className={`flex items-center space-x-3 p-3 rounded-lg text-base font-medium transition-all duration-300 hover:bg-blue-600 hover:text-white ${isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-800'}`}
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
