import React, { Component } from 'react';
import 'devextreme/dist/css/dx.light.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthRoutes from './routes/AuthRoutes';
import CustomerRoutes from './routes/CustomerRoutes';
import PartnerRoutes from './routes/PartnerRoutes';
import AdminRoutes from './routes/AdminRoutes';


function App() {
  return (
    <Router>
      <ToastContainer />
        <AuthRoutes />
        <CustomerRoutes />
        <PartnerRoutes />
        <AdminRoutes />
    </Router>
  );
}

export default App;
