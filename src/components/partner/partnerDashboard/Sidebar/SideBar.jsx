import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import img from '../../../../assets/hipsta-high-resolution-logo-transparent1.png';
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaBook,
  FaUsers,
  FaClock,
  FaHeadset,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import ThemeContext from '../../../../ThemeContext'

const Sidebar = ({ isSidebarMinimized, onToggleSidebar }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const menuItems = [
    { title: 'Dashboard', link: '/partner', icon: <FaTachometerAlt />, restrictedOnMobile: false },
    { title: 'Calendar', link: '/partner/calendar', icon: <FaCalendarAlt />, restrictedOnMobile: false },
    { title: 'Catalog', link: '/partner/catalog', icon: <FaBook />, restrictedOnMobile: false },
    { title: 'Team', link: '/partner/team', icon: <FaUsers />, restrictedOnMobile: false },
    { title: 'Profile', link: '/partner/profile', icon: <CgProfile />, restrictedOnMobile: true },
    { title: 'Availability', link: '/employeeAvailability', icon: <FaClock />, restrictedOnMobile: true },
    { title: 'Help', link: '/helpdesk/tickets', icon: <FaHeadset />, restrictedOnMobile: false },
  ];
  
  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex flex-col h-full transition-all duration-300 ${
          isSidebarMinimized ? 'w-16' : 'w-48'
        } ${
          isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-900'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-4 mb-8">
          <div className="flex items-center">
            <img src={img} alt="Logo" className="h-8 w-auto" />
          </div>
          <button
            onClick={onToggleSidebar}
            className={`p-2 rounded-full hover:${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            }`}
          >
            {isSidebarMinimized ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                isSidebarMinimized ? 'justify-center' : ''
              } hover:${
                isDarkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-800'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              {!isSidebarMinimized && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>

        <div className="pb-4">
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-between w-full p-3 rounded-lg transition-all duration-300`}
          >
            <div
              className={`relative w-10 h-5 rounded-full ${
                isDarkMode ? 'bg-white' : 'bg-gray-700'
              }`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-gray-800 transition-all duration-300 ${
                  isDarkMode ? 'transform translate-x-5' : ''
                }`}
              >
                <span
                  className={`absolute inset-0 flex items-center justify-center text-xs ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {isDarkMode ? '🌙' : '🌞'}
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

     {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 w-full bg-white shadow-md flex justify-around p-2">
          {menuItems
            .filter((item) => !item.restrictedOnMobile) // Filter out restricted items for mobile
            .map((item) => (
              <button
                key={item.title}
                className={`flex flex- col items-center space-y-1 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-600 hover:text-white transition-all duration-300 ${
                  activeTab === item.title ? 'bg-gray-300 text-white' : ''
                }`}
                onClick={() => {
                  setActiveTab(item.title);
                  window.location.href = item.link;
                }}
              >
                <span className="text-xl">{item.icon}</span>
              </button>
            ))}
        </div>

    </>
  );
};

export default Sidebar;
