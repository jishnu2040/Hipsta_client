import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaHandshake, FaCalendarAlt, FaCogs } from 'react-icons/fa';

const Sidebar = () => (
  <div className="w-64 bg-gray-800 text-white h-screen shadow-md">
    <div className="p-6 flex items-center justify-center bg-gray-900">
      <h1 className="text-3xl font-semibold">Admin</h1>
    </div>
    <nav className="mt-6">
      <Link to="/admin/dashboard" className="flex items-center py-3 px-4 hover:bg-gray-700 transition duration-300">
        <FaHome className="text-xl mr-3" />
        <span>Dashboard</span>
      </Link>
      <Link to="/admin/user-management" className="flex items-center py-3 px-4 hover:bg-gray-700 transition duration-300">
        <FaUsers className="text-xl mr-3" />
        <span>User Management</span>
      </Link>
      <Link to="/admin/partner-management" className="flex items-center py-3 px-4 hover:bg-gray-700 transition duration-300">
        <FaHandshake className="text-xl mr-3" />
        <span>Partner Management</span>
      </Link>
      <Link to="/admin/booking-list" className="flex items-center py-3 px-4 hover:bg-gray-700 transition duration-300">
        <FaCalendarAlt className="text-xl mr-3" />
        <span>Booking List</span>
      </Link>
      <Link to="/admin/service-type-management" className="flex items-center py-3 px-4 hover:bg-gray-700 transition duration-300">
        <FaCogs className="text-xl mr-3" />
        <span>Service Type Management</span>
      </Link>
     
    </nav>
  </div>
);

export default Sidebar;
