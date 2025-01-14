import React from 'react';
import { Link } from 'react-router-dom'; // useNavigate can be omitted since there's no logout logic
import { FaUser, FaBuilding } from 'react-icons/fa';
import ThemeContext from '../../../../ThemeContext'; // Assuming you have a context for dark mode

const TeamMenu = () => {
  const { isDarkMode } = React.useContext(ThemeContext); // Accessing dark mode context

  const data = [
    { title: 'Members', link: '/partner/team/', icon: <FaUser /> },
    { title: 'Schedule', link: '/partner/team/schedule', icon: <FaBuilding /> },
  ];

  return (
    <div
      className={`w-full h-full p-2 flex flex-col   rounded-lg shadow-md sm:p-4 ${
        isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'
      }`}
    >
      {/* Heading */}
      <div className="hidden sm:block sm:mt-32  ">
        <h2 className="text-lg font-bold">
          Team Management
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex sm:flex-col  sm:space-y-2 sm:p-4">
        {data.map((item) => (
          <div
            key={item.title}
            className={`flex items-center p-2 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition duration-200 ease-in-out ${
              isDarkMode ? 'hover:bg-gray-700 hover:text-blue-400' : ''
            }`}
          >
            <span className="mr-2">{item.icon}</span>
            <Link
              to={item.link}
              className={`text-base font-medium w-full text-left ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}
            >
              {item.title}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default TeamMenu;
