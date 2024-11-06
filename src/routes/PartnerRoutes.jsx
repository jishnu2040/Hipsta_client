// src/routes/PartnerRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PartnerDashboard from '../Pages/partner/dashboard/PartnerDashBoard';
import BasicInfo from '../components/partner/basicInfo';
import Services from '../components/partner/Services';
import TeamSize from '../components/partner/TeamSize';
import Location from '../components/partner/Location';
import VerifyData from '../components/partner/VerifyData'
import Registration from '../Pages/partner/Registration';

const PartnerRoutes = () => {
  return (
    <Routes>
      <Route path="/registration" element={<Registration />}>
      </Route>
      <Route path="/partner" element={<PartnerDashboard />} />
      <Route path="/partner-details" element={<BasicInfo />} />
      <Route path="/services" element={<Services />} />
      <Route path='/teamSize' element={<TeamSize />} />
      <Route path='/location' element={<Location />} />
      <Route path='/location/verify-page' element={<VerifyData />} />
    </Routes>
  );
};

export default PartnerRoutes;
