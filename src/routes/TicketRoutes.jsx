import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HelpDesk from '../Pages/customer/CustomerTickets/HelpDesk';
import TicketDashboard from '../Pages/Ticket/TicketDashboard';
import TicketDetails from '../Pages/Ticket/TicketDetails';
import RaiseTicket from '../Pages/Ticket/RaiseTicket';
import AssignTicket from '../Pages/Ticket/AssignTicket';
import Chat from '../Pages/Ticket/Chat';
import FAQ from '../Pages/customer/CustomerTickets/FAQ';

const TicketRoutes = () => {
  return (
    <Routes>
      {/* Root HelpDesk route */}
      <Route path="/helpdesk" element={<HelpDesk />}>
        {/* Nested routes to render in the Outlet */}
        <Route path="" element={<TicketDashboard />} /> {/* Dashboard */}
        <Route path="tickets" element={<TicketDashboard />} />
        <Route path="tickets/:ticketId" element={<TicketDetails />} />
        <Route path="tickets/new" element={<RaiseTicket />} />
        <Route path="assignTicket" element={<AssignTicket />} />
        <Route path="chat" element={<Chat />} />
        <Route path="faq" element={< FAQ/>} /> 
      </Route>
    </Routes>
  );
};

export default TicketRoutes;
