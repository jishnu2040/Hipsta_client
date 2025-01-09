import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarCheck, FaKey } from 'react-icons/fa';

const ProfileSideBar = () => {
  const [activeTab, setActiveTab] = useState('Personal');

  const navItems = [
    { title: 'Personal', link: '/profile/', icon: <FaUser /> },
    { title: 'Bookings', link: '/profile/bookings', icon: <FaCalendarCheck /> },
    { title: 'Reset', link: '/auth/forgotpassword', icon: <FaKey /> },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-white shadow-lg">
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex flex-col flex-grow p-4 space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300 ${activeTab === item.title ? 'bg-blue-600 text-white' : ''}`}
            onClick={() => setActiveTab(item.title)}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-base font-medium">{item.title}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile Navigation Buttons */}
      <div className="lg:hidden fixed bottom-0 w-full bg-white shadow-md flex justify-around p-2">
        {navItems.map((item) => (
          <button
            key={item.title}
            className={`flex flex-col items-center space-y-1 px-8 py-2 rounded-lg text-gray-700 hover:bg-gray-600 hover:text-white transition-all duration-300 ${activeTab === item.title ? 'bg-gray-300 text-white' : ''}`}
            onClick={() => {
              setActiveTab(item.title);
              window.location.href = item.link;
            }}
          >
            <span className="text-xl">{item.icon}</span>
            
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileSideBar;
