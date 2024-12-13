import React from 'react';
import HelpDeskSideBar from './HelpDeskSideBar';
import { Outlet } from 'react-router-dom';

const HelpDashBoard = () => {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Sidebar */}
      <div className=" w-full lg:w-1/6 border border-gray-500 rounded-md lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <HelpDeskSideBar />
      </div>
      {/* Main Content */}
      <div className="w-full lg:w-5/6 rounded-lg overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default HelpDashBoard;
