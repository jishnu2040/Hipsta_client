import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from '../Pages/admin/AdminDashBoard';
import AdminLoginPage from '../Pages/admin/AdminLoginPage';
import BookingList from '../components/admin/BookingList';
import Customer from '../components/admin/Customer';
import PartnerManagement from '../components/admin/PartnerManagement';
import Notification from '../components/admin/Notification';
import Report from '../components/admin/Report'
import Settings from '../components/admin/Settings';
import Support from '../components/admin/Support';
import Dashboard from '../components/admin/Dashboard';


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminDashboard />} >
        <Route index element={<Dashboard />}/>
        <Route path='bookings' element={<BookingList />} />
        <Route path='customer' element={<Customer/>}/>
        <Route path='partnerManagement' element={<PartnerManagement/>}/>
        <Route path='notification' element={<Notification/>}/>
        <Route path='report' element={<Report />}/>
        <Route path='settings' element={<Settings/>}/>
      </Route>
      <Route path='/support' element={<Support />}/>
    </Routes>
  );
};

export default AdminRoutes;
