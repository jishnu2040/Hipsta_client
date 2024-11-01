import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/customer/Home/Home';
import Profile  from '../Pages/customer/Profile/Profile';


const CustomerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      {/* Add more customer routes here */}
    </Routes>
  );
};

export default CustomerRoutes;
