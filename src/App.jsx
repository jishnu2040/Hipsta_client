import React, { Component } from 'react';
import 'devextreme/dist/css/dx.light.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthRoutes from './routes/AuthRoutes';
import CustomerRoutes from './routes/CustomerRoutes';
import PartnerRoutes from './routes/PartnerRoutes';
import AdminRoutes from './routes/AdminRoutes';
import TicketRoutes from './routes/TicketRoutes'
// import TicketNotifications from './Services/TicketNotifications';


function App() {
  return (
    <Router>
      <ToastContainer />
      {/* <TicketNotifications > */}
        <AuthRoutes />
        <CustomerRoutes />
        <PartnerRoutes />
        <AdminRoutes />
        <TicketRoutes />
        {/* \</TicketNotifications> */}
    </Router>
  );
}

export default App;
