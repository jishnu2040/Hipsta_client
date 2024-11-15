import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../ThemeContext'; 
import Registration from '../Pages/partner/Registration';
import PartnerDashboardLayout from '../Pages/partner/PartnerDashboardLayout';
import Calendar from '../components/dashboard/Calendar';
import SchedulerComponent from '../components/partner/partnerDashboard/SchedulerComponent';
import Team from '../components/partner/partnerDashboard/Team';
import Catalog from '../components/partner/partnerDashboard/Catalog';
import Dashboard from '../components/partner/partnerDashboard/Dashboard';

const PartnerRoutes = () => {
  return (
    <Routes>
      <Route path="partner/registration" element={<Registration />} />
      <Route path="/partner" element={<ThemeProvider> <PartnerDashboardLayout /> </ThemeProvider>} >
        <Route index element={< Dashboard/>} />
        <Route path='calendar' element={< SchedulerComponent/>}/>
        <Route path='catalog' element={<Catalog />}/>
        <Route path='team' element={< Team/>}/>

      </Route>
    </Routes>
  );
};

export default PartnerRoutes;
