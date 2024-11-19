import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../ThemeContext'; 
import Registration from '../Pages/partner/Registration';
import PartnerDashboardLayout from '../Pages/partner/PartnerDashboardLayout';
import SchedulerComponent from '../components/partner/partnerDashboard/SchedulerComponent';
import Team from '../components/partner/partnerDashboard/Team';
import Catalog from '../components/partner/partnerDashboard/Catalog';
import Dashboard from '../components/partner/partnerDashboard/Dashboard';
import Profile from '../Pages/partner/Profile';
import WorkPlace from '../components/partner/profile/WorkPlace';
import PartnerProfile from '../components/partner/profile/PartnerProfile';
import Logout from '../components/auth/Logout';

const PartnerRoutes = () => {
  return (
    <Routes>
      <Route path="partner/registration" element={<Registration />} />
      <Route path="/partner" element={<ThemeProvider> <PartnerDashboardLayout /> </ThemeProvider>} >
        <Route index element={< Dashboard/>} />
        <Route path='calendar' element={< SchedulerComponent/>}/>
        <Route path='catalog' element={<Catalog />}/>
        <Route path='team' element={< Team/>}/>
        <Route path='profile' element={<Profile/>}>
            <Route index element={<PartnerProfile />}/>
            <Route path='workplace' element={<WorkPlace />}/>
            <Route path='logout' element={<Logout />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default PartnerRoutes;
