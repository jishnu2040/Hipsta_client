import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Signup, Login, ForgetPassword, VerifyCode, ResetPassword } from '../Pages/auth';


const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify" element={<VerifyCode />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgetPassword />} />
      <Route path="/password-reset-confirm/:uid/:token" element={<ResetPassword />} />
    </Routes>
  );
};

export default AuthRoutes;
