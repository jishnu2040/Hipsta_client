import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Signup, Login, ForgetPassword, VerifyCode, ResetPassword } from '../Pages/auth';
import Drawer from '../Pages/auth/Drawer';

const AuthRoutes = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const navigate = useNavigate(); // To programmatically navigate

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    navigate('/'); // Redirect to the Home page
  };

  return (
    <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose}>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify" element={<VerifyCode />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
        <Route path="/password-reset-confirm/:uid/:token" element={<ResetPassword />} />
      </Routes>
    </Drawer>
  );
};

export default AuthRoutes;
