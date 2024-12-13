import React from 'react';
import { Link } from 'react-router-dom';
import { FaTicketAlt, FaPlusSquare, FaHome, FaQuestionCircle } from 'react-icons/fa';

const HelpDeskSideBar = () => {
  const role = localStorage.getItem('role');

  const navItems = [
    { title: 'Dashboard', link: '/helpdesk', icon: <FaHome />, show: role !== 'customer' },
    { title: 'Raise Ticket', link: '/helpdesk/tickets/new', icon: <FaPlusSquare />, show: true },
    { title: 'All Tickets', link: '/helpdesk/tickets', icon: <FaTicketAlt />, show: true },
    { title: 'FAQ', link: '/helpdesk/faq', icon: <FaQuestionCircle />, show: true }, // Add FAQ link
  ];

  return (
    <div className="w-full h-full flex flex-col bg-white shadow-lg rounded-lg">
      <nav className="flex-grow p-4 space-y-4">
        {navItems
          .filter((item) => item.show)
          .map((item) => (
            <Link
              key={item.title}
              to={item.link}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-base font-medium">{item.title}</span>
            </Link>
          ))}
      </nav>
    </div>
  );
};

export default HelpDeskSideBar;
