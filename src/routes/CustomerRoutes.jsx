import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/customer/Home/Home';
import Profile  from '../Pages/customer/Profile/Profile';
import PartnerListPage from '../Pages/customer/PartnerList/PartnerListPage';
import Tickets from '../components/customer/Ticket/Tickets';
import CreateTicket from '../components/customer/Ticket/CreateTicket';


const CustomerRoutes = () => {
  return (
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/profile" element={<Profile />} />
       <Route path='/partnersView' element={< PartnerListPage/>}/>
       <Route path="/tickets" element={<Tickets />} />
       <Route path="/create-ticket" element={<CreateTicket />} />
    </Routes>
  );
};

export default CustomerRoutes;
