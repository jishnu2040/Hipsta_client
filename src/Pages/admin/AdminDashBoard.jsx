import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/SideBar';
import Header from '../../components/admin/Header';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto bg-cyan-950">
        <Sidebar />
      </div>
      <div className="w-full  flex flex-col">
        <Header />
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
