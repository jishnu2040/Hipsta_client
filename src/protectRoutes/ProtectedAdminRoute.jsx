import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  const userRole = localStorage.getItem('role');

  console.log("Debug ProtectedAdminRoute: token =", token, "userRole =", userRole);

  // Redirect to admin login if no token or incorrect role
  if (!token) {
    console.log("Unauthorized access to admin route. Redirecting to /admin/login");
    return <Navigate to="/admin/login" replace />;
  }

  // Render children if checks pass
  return children || null;
};

export default ProtectedAdminRoute;
