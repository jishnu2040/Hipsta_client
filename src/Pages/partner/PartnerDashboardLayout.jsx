import React, {useEffect} from 'react';
import SideBar from '../../components/partner/partnerDashboard/SideBar';
import { Outlet } from 'react-router-dom';

const PartnerDashboardLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen ">
      <div className="w-full lg:w-1/6 border border-gray-500 rounded-md lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <SideBar />
      </div>
      <div className="w-full lg:w-5/6 rounded-lg  overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default PartnerDashboardLayout