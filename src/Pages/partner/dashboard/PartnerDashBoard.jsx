import React, { createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from '../../../components/dashboard/SideBar';
import DashBoard from '../../../components/dashboard/DashBoard';
import Calendar from '../../../components/dashboard/Calendar';
import Catalog from '../../../components/dashboard/Catalog';
import Team from '../../../components/dashboard/Team';
import Reports from '../../../components/dashboard/Reports';
import Users from '../../../components/dashboard/Users';
import Header from '../../../components/dashboard/Header';

const MyContext = createContext();

function PartnerDashBoard() {
  return (
    <MyContext.Provider value={{}}>
      <div className="flex">
        <div className="sidebarWrapper w-[15%]">
          <SideBar />
        </div>
        
        <div className="content_Right w-[85%]">
          <Header />
          <div className="p-3">
            <Routes>
              {/* <Route path="/" element={<DashBoard />} /> */}
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/" element={<Catalog />} />
              <Route path="/team" element={<Team />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default PartnerDashBoard;
