import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboardLayout from '../layouts/AdminDashboardLayout';
import AdminLoginPage from '../Pages/admin/AdminLoginPage';
import BookingList from '../Pages/admin/BookingList';
import Customer from '../Pages/admin/Customer';
import PartnerManagement from '../Pages/admin/PartnerManagement';
import Notification from '../Pages/admin/Notification';
import Report from '../Pages/admin/Report';
import Settings from '../Pages/admin/Settings';
import Banner from '../Pages/admin/Banner';
import Support from '../Pages/admin/Support';
import Dashboard from '../Pages/admin/Dashboard';
import ProtectedAdminRoute from '../protectRoutes/ProtectedAdminRoute';


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin"  element={<ProtectedAdminRoute ><AdminDashboardLayout /></ProtectedAdminRoute>}>
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
