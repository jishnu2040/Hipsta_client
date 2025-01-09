import React from 'react';
import ProfileSideBar from './ProfileSideBar';
import { Outlet } from 'react-router-dom';

const ProfileDashBoard = () => {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      {/* Sidebar */}
      <div className=" w-full lg:w-1/6  lg:sticky lg:top-0 lg:h-auto lg:overflow-y-auto">
        <ProfileSideBar />
      </div>
      {/* Main Content */}
      <div className="w-full lg:w-5/6 rounded-lg overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileDashBoard;
