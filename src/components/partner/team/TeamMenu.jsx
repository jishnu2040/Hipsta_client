import React from 'react';
import { Link } from 'react-router-dom'; // useNavigate can be omitted since there's no logout logic
import { FaUser, FaBuilding } from 'react-icons/fa'; 

const TeamMenu = () => {
  const data = [
    { title: 'Members', link: '/partner/team/', icon: <FaUser /> },
    { title: 'Schedule', link: '/partner/team/schedule', icon: <FaBuilding /> }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center rounded-lg shadow-md p-4">
      {/* Heading */}
      <div className="mt-32">
        <h2 className="text-lg font-bold text-gray-600">Team Management</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow space-y-2 p-4">
        {data.map((item) => (
          <div key={item.title} className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition duration-200 ease-in-out">
            <span className="mr-2">{item.icon}</span>
            {/* If link is provided, render the Link component */}
            <Link to={item.link} className="text-base font-medium w-full text-left">
              {item.title}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default TeamMenu;
