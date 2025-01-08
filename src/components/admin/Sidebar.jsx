import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarCheck, FaUserAlt, FaUsers, FaBell, FaChartLine, FaCogs, FaHeadset } from 'react-icons/fa';
import { PiFlagBannerFill } from "react-icons/pi";
import avatarImage from '../../assets/man.png'
const Sidebar = () => {

    const data = [
        { title: 'Dashboard', Link: '/admin', icon: <FaTachometerAlt /> },
        { title: 'Booking', Link: '/admin/bookings', icon: <FaCalendarCheck /> },
        { title: 'Customer', Link: '/admin/customer', icon: <FaUserAlt /> },
        { title: 'Partner', Link: '/admin/partnerManagement', icon: <FaUsers /> },
        { title: 'Notification', Link: '/admin/notification', icon: <FaBell /> },
        { title: 'Report', Link: '/admin/report', icon: <FaChartLine /> },
        { title: 'Settings', Link: '/admin/settings', icon: <FaCogs /> },
        { title : 'banner', Link: '/admin/banner', icon: <PiFlagBannerFill /> },
        { title: 'Support', Link: '/support', icon: <FaHeadset /> },
    ];

    return (
        <div className="sidebar text-white ">
            <div className="flex items-center px-2 py-2 mb-6 ">
                <img
                    src={avatarImage}
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-md"
                />
                <div className="ml-4 flex-1">
                    <h1>Admin</h1>
                </div>
            </div>
            <nav className="flex-grow ">
                {data.map((item) => (
                    <Link 
                        key={item.title}
                        to={item.Link}
                        className="flex items-center space-x-4 py-3 px-4 text-lg hover:bg-gray-900 rounded-lg"
                    >
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
