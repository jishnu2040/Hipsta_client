// src/routes/PartnerRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Registration from '../Pages/partner/Registration';

const PartnerRoutes = () => {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
    </Routes>
  );
};

export default PartnerRoutes;
