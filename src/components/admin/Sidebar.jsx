import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarCheck, FaUserAlt, FaUsers, FaBell, FaChartLine, FaCogs, FaHeadset } from 'react-icons/fa';

const Sidebar = () => {

    const data = [
        { title: 'Dashboard', Link: '/admin', icon: <FaTachometerAlt /> },
        { title: 'Booking', Link: '/admin/bookings', icon: <FaCalendarCheck /> },
        { title: 'Customer', Link: '/admin/customer', icon: <FaUserAlt /> },
        { title: 'Partner', Link: '/admin/partnerManagement', icon: <FaUsers /> },
        { title: 'Notification', Link: '/admin/notification', icon: <FaBell /> },
        { title: 'Report', Link: '/admin/report', icon: <FaChartLine /> },
        { title: 'Settings', Link: '/admin/settings', icon: <FaCogs /> },
        { title: 'Support', Link: '/support', icon: <FaHeadset /> }
    ];

    return (
        <div className="sidebar mt-16">
            <div className='items-center'>
                Admin
            </div>
            <nav className="flex-grow px-2">
                {data.map((item) => (
                    <Link 
                        key={item.title}
                        to={item.Link}
                        className="flex items-center space-x-4 py-3 px-4 text-lg hover:bg-gray-200"
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
