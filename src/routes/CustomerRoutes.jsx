import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/customer/Home/Home';
import Profile  from '../Pages/customer/Profile/Profile';
import PartnerListPage from '../Pages/customer/PartnerList/PartnerListPage';
import Tickets from '../components/customer/Ticket/Tickets';
import CreateTicket from '../components/customer/Ticket/CreateTicket';
import PartnerDetailedPage from '../Pages/customer/partnerPage/PartnerDetailedPage'
import Appointment from '../components/customer/partnerDetails/Appointment';
import BookingPage from '../components/customer/booking/BookingPage';
import Map from '../components/customer/map/Map';


const CustomerRoutes = () => {
  return (
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/profile" element={<Profile />} />
       <Route path='/partnersView' element={< PartnerListPage/>}/>
       <Route path="/tickets" element={<Tickets />} />
       <Route path="/create-ticket" element={<CreateTicket />} />
       <Route path="/detaildPage/:partnerId" element={<PartnerDetailedPage/>} />
       <Route path="/appointment/:serviceId" element={<Appointment/>} />
       <Route path="/payment" element={<BookingPage/>} />
       <Route path='/map' element={<Map/>}/>
    </Routes>
  );
};

export default CustomerRoutes;
