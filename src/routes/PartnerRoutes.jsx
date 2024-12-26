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
import EmployeeAvailability from '../components/partner/partnerDashboard/EmployeeAvailability';
import ProtectedRoute from '../protectRoutes/ProtectedRoute';
import AddHoliday from '../components/partner/partnerDashboard/AddHoliday';
import SubscriptionRenewal from '../components/partner/subscription/SubscriptionRenewal';
import Pricing from '../components/partner/subscription/Pricing';
// import PaymentPage from '../components/partner/subscription/PaymentPage';
const PartnerRoutes = () => {
  return (
    <Routes>
      <Route path="partner/registration" element={<Registration />} />
      <Route path="/subs" element={<SubscriptionRenewal/>} />
      <Route path="/sub" element={<Pricing/>} />
      {/* <Route path="/pay" element={<PaymentPage/>} /> */}
      <Route path="/partner" element={<ThemeProvider> <ProtectedRoute allowedRole={['partner']}><PartnerDashboardLayout /></ProtectedRoute></ThemeProvider>}>
        <Route index element={<Dashboard />} />
        <Route path="calendar" element={<SchedulerComponent />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="catalog/new-service" element={<NewService />} />
        <Route path="team" element={<Team />}>
          <Route index element={<TeamMembers />} />
          <Route path="schedule" element={<AvailabilityList />} />
        </Route>
        <Route path="team/new-member" element={<AddEmployee />} />
        <Route path="profile" element={<Profile />}>
          <Route index element={<PartnerProfile />} />
          <Route path="workplace" element={<WorkPlace />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Route>
      <Route path="employeeAvailability" element={<EmployeeAvailability />} />
      <Route path="/holiday" element={<AddHoliday/>} />

    </Routes>
  );
};

export default PartnerRoutes;
