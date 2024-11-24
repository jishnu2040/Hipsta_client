import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../ThemeContext'; 
import Registration from '../Pages/partner/Registration';
import PartnerDashboardLayout from '../Pages/partner/PartnerDashboardLayout';
import SchedulerComponent from '../components/partner/partnerDashboard/SchedulerComponent';
import Team from '../Pages/partner/Team';
import Catalog from '../components/partner/partnerDashboard/Catalog';
import Dashboard from '../components/partner/partnerDashboard/Dashboard';
import Profile from '../Pages/partner/Profile';
import WorkPlace from '../components/partner/profile/WorkPlace';
import PartnerProfile from '../components/partner/profile/PartnerProfile';
import Logout from '../components/auth/Logout';
import NewService from '../components/partner/partnerDashboard/NewService';
import TeamMembers from '../components/partner/team/TeamMembers';
import ScheduledShift from '../components/partner/team/ScheduledShift';
import AddEmployee from '../components/partner/team/AddEmployee';
import AvailabilityList from '../components/partner/partnerDashboard/AvailabiltyList';

const PartnerRoutes = () => {
  return (
    <Routes>
      <Route path="partner/registration" element={<Registration />} />


      <Route path="/partner" element={<ThemeProvider> <PartnerDashboardLayout /> </ThemeProvider>} >
        <Route index element={<Dashboard />} />

        <Route path='calendar' element={<SchedulerComponent />}>
          <Route path='addservice' element={<NewService />} />
        </Route>

        <Route path='catalog' element={<Catalog />} />
        <Route path='catalog/new-service' element={<NewService />} />

        <Route path='team' element={<Team />}>
          <Route index element={<TeamMembers />} />
          <Route path='scheduleShift' element={<ScheduledShift />} />
        </Route>

        <Route path='team/new-member' element={< AddEmployee/>}/>
        <Route path='profile' element={<Profile />}>
          <Route index element={<PartnerProfile />} />
          <Route path='workplace' element={<WorkPlace />} />
          <Route path='logout' element={<Logout />} />
        </Route>
        <Route path='availabilitylist' element={< AvailabilityList/>}/>
        
      </Route>

      
    </Routes>
  );
};

export default PartnerRoutes;
