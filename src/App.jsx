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
      <Routes>
        {/* Main routes */}
        <Route path="/*" element={<CustomerRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/partner/*" element={<PartnerRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/tickets/*" element={<TicketRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
