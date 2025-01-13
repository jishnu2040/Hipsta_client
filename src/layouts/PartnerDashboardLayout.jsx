import React, { useState } from 'react';
import Sidebar from '../components/partner/partnerDashboard/Sidebar';
import Header from '../components/partner/partnerDashboard/Header';
import { Outlet } from 'react-router-dom';

const PartnerDashboardLayout = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarMinimized((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar
        isSidebarMinimized={isSidebarMinimized}
        onToggleSidebar={handleSidebarToggle}
      />

      {/* Main Content */}
      <div className={`flex flex-col flex-grow transition-all duration-300 `}>
        <Header />
        <div className="flex-1  overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PartnerDashboardLayout;
