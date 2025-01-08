import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../Pages/admin/AdminDashBoard';
import AdminLoginPage from '../Pages/admin/AdminLoginPage';
import BookingList from '../components/admin/BookingList';
import Customer from '../components/admin/Customer';
import PartnerManagement from '../components/admin/PartnerManagement';
import Notification from '../components/admin/Notification';
import Report from '../components/admin/Report';
import Settings from '../components/admin/Settings';
import Banner from '../components/admin/banner';
import Support from '../components/admin/Support';
import Dashboard from '../components/admin/Dashboard';
import ProtectedAdminRoute from '../protectRoutes/ProtectedAdminRoute';


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin"  element={<ProtectedAdminRoute ><AdminDashboard /></ProtectedAdminRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<BookingList />} />
        <Route path="customer" element={<Customer />} />
        <Route path="partnerManagement" element={<PartnerManagement />} />
        <Route path="notification" element={<Notification />} />
        <Route path="report" element={<Report />} />
        <Route path="settings" element={<Settings />} />
        <Route path="banner" element={<Banner />} />
      </Route>
      <Route path="/support" element={<Support />} />
    </Routes>
  );
};

export default AdminRoutes;
