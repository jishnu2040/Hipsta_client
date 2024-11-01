import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../Pages/admin/AdminDashBoard'; // Ensure this path is correct
import AdminLoginPage from '../Pages/admin/AdminLoginPage';
import UserManagement from '../components/admin/UserManagement';
import PartnerManagement from '../components/admin/PartnerManagement';
import BookingList from '../components/admin/BookingList';
import ServiceTypeManager from '../components/admin/ServiceTypeManager'; // Import the new component

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/user-management" element={<UserManagement />} />
      <Route path="/admin/partner-management" element={<PartnerManagement />} />
      <Route path="/admin/booking-list" element={<BookingList />} />
      <Route path="/admin/service-type-management" element={<ServiceTypeManager />} /> {/* Add the new route */}
      {/* Add more admin routes here if needed */}
    </Routes>
  );
};

export default AdminRoutes;
