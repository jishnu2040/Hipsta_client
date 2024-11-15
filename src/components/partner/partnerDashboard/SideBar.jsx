import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarAlt, FaBook, FaUsers } from 'react-icons/fa'; 
import ThemeContext from '../../../ThemeContext';
import avatarImage from '../../../assets/man.png';

const SideBar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const data = [
    { title: 'Dashboard', link: '/partner', icon: <FaTachometerAlt /> },
    { title: 'Calendar', link: '/partner/calendar', icon: <FaCalendarAlt /> },
    { title: 'Catalog', link: '/partner/catalog', icon: <FaBook /> },
    { title: 'Team', link: '/partner/team', icon: <FaUsers /> },
  ];

  return (
    <div className={`w-full h-full flex flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>

       {/* Profile Section */}
       <div className="flex items-center p-2 mb-4">
        <img
          src={avatarImage}
          alt="User Avatar"
          className="w-12 h-12 rounded-full mr-4"
        />
        <h1
          className={`text-lg font-semibold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Username
        </h1>
      </div>


      {/* Navigation links */}
      <nav className="mb-6 space-y-3 flex-grow">
        {data.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className={`flex items-center space-x-2 p-2 rounded-lg hover:font-semibold transition-colors ${
              isDarkMode ? 'text-white' : 'hover:bg-gray-200'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`  mb-2 p-2 rounded-full w-16 h-8 flex items-center ${
          isDarkMode ? 'bg-gray-500' : 'bg-gray-300'
        } transition-colors duration-300 mt-auto`}
      >
        <div
          className={`w-6 h-6 rounded-full bg-white transform ${
            isDarkMode ? 'translate-x-8' : 'translate-x-0'
          } transition-transform duration-300`}
        ></div>
      </button>
    </div>
  );
};

export default SideBar;
