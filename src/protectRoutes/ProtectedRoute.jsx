import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole, loginPath = '/login' }) => {
  const token = localStorage.getItem('access_token'); // Retrieve the access token
  const userRole = localStorage.getItem('role'); // Retrieve the user's role

  console.log("Debug ProtectedRoute: token =", token, "userRole =", userRole);

  // Redirect to the login page if token is missing
  if (!token) {
    console.log(`Token missing. Redirecting to ${loginPath}`);
    return <Navigate to={loginPath} replace />;
  }

  // Redirect if userRole is not in allowedRole
  if (!allowedRole.includes(userRole)) {
    console.log("Unauthorized role, redirecting to /");
    return <Navigate to="/" replace />;
  }

  // Render children if all checks pass
  return children || null;
};

export default ProtectedRoute;
