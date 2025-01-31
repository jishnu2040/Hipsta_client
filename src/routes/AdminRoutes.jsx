import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboardLayout from '../layouts/AdminDashboardLayout';
import AdminLoginPage from '../Pages/admin/AdminLoginPage';
import BookingList from '../Pages/admin/BookingList';
import Customer from '../Pages/admin/Customer';
import PartnerManagement from '../Pages/admin/PartnerManagement';
import Notification from '../Pages/admin/Notification';
import Banner from '../Pages/admin/Banner';
import SpecializationManager from '../Pages/admin/SpecializationManager';
import Support from '../Pages/admin/Support';
import Dashboard from '../Pages/admin/Dashboard';
import ProtectedAdminRoute from '../protectRoutes/ProtectedAdminRoute';
import Service from '../Pages/admin/Service';


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
        <Route path="banner" element={<Banner />} />
        <Route path="service" element={<Service />} />
        <Route path="specializations" element={<SpecializationManager />} />
      </Route>
      <Route path="/support" element={<Support />} />
    </Routes>
  );
};

export default AdminRoutes;
