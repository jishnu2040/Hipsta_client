import React from 'react';
import 'devextreme/dist/css/dx.light.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthRoutes from './routes/AuthRoutes';
import CustomerRoutes from './routes/CustomerRoutes';
import PartnerRoutes from './routes/PartnerRoutes';
import AdminRoutes from './routes/AdminRoutes';
import TicketRoutes from './routes/TicketRoutes';

function App() {
  return (
    <Router>
      <ToastContainer />
      <CustomerRoutes />
      <PartnerRoutes />
      <AdminRoutes />
      <TicketRoutes />
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
