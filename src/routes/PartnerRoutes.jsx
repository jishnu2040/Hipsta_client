import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../ThemeContext';
import Registration from '../Pages/partner/PartnerRegistration/Registration';
import PartnerDashboardLayout from '../layouts/PartnerDashboardLayout';
import SchedulerComponent from '../Pages/partner/PartnerDashboard/SchedulerComponent';
import Team from '../Pages/partner/PartnerDashboard/Team';
import Catalog from '../Pages/partner/PartnerDashboard/Catalog';
import Dashboard from '../Pages/partner/PartnerDashboard/Dashboard';
import Profile from '../Pages/partner/PartnerDashboard/Profile';
import WorkPlace from '../components/partner/partnerDashboard/profile/WorkPlace';
import PartnerProfile from '../components/partner/partnerDashboard/profile/PartnerProfile';
import Logout from '../components/auth/Logout';
import NewService from '../components/partner/partnerDashboard/Service/NewService';
import TeamMembers from '../components/partner/partnerDashboard/team/TeamMembers';
import AddEmployee from '../components/partner/partnerDashboard/team/AddEmployee';
import AvailabilityList from '../components/partner/partnerDashboard/Availability/AvailabiltyList';
import EmployeeAvailability from '../Pages/partner/PartnerDashboard/EmployeeAvailability';
import ProtectedRoute from '../protectRoutes/ProtectedRoute';
import AddHoliday from '../components/partner/partnerDashboard/team/AddHoliday';
import Pricing from '../components/partner/subscription/Pricing';
import QRScannerComponent from '../components/partner/partnerDashboard/QRcode/QRScannerComponent';
// import PaymentPage from '../components/partner/subscription/PaymentPage';
const PartnerRoutes = () => {
  return (
    <Routes>
      <Route path="partner/registration" element={<Registration />} />
      <Route path="/partner-subscription" element={<Pricing/>} />
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
        <Route path="qr" element= {<QRScannerComponent />}/>
      </Route>
      <Route path="employeeAvailability" element={<EmployeeAvailability />} />
      <Route path="/holiday" element={<AddHoliday/>} />
      

    </Routes>
  );
};

export default PartnerRoutes;
