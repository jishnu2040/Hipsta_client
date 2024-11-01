// src/components/dashboard/SideBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineDashboard, MdCalendarToday, MdList, MdPeople, MdAssessment, MdPerson } from "react-icons/md";

function SideBar() {
  return (
    <div className="sidebar fixed top-0 left-0 z-[100] w-[15%] h-screen bg-gray-800 text-white">
      <h1 className="text-xl font-bold py-4 text-center">Partner Dashboard</h1>
      <div className="sidebarTabs">
        <Link to="/partner" className="block py-3 px-4 hover:bg-gray-700">
          <MdOutlineDashboard className="mr-3" /> Dashboard
        </Link>
        <Link to="/partner/calendar" className="block py-3 px-4 hover:bg-gray-700">
          <MdCalendarToday className="mr-3" /> Calendar
        </Link>
        <Link to="/partner/catalog" className="block py-3 px-4 hover:bg-gray-700">
          <MdList className="mr-3" /> Catalog
        </Link>
        <Link to="/partner/team" className="block py-3 px-4 hover:bg-gray-700">
          <MdPeople className="mr-3" /> Team
        </Link>
        <Link to="/partner/reports" className="block py-3 px-4 hover:bg-gray-700">
          <MdAssessment className="mr-3" /> Reports
        </Link>
        <Link to="/partner/users" className="block py-3 px-4 hover:bg-gray-700">
          <MdPerson className="mr-3" /> Users
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
