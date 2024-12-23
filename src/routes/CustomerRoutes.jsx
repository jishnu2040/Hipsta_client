import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/customer/Home/Home';
import Profile  from '../Pages/customer/Profile/Profile';
import PartnerListPage from '../Pages/customer/PartnerList/PartnerListPage';
import PartnerDetailedPage from '../Pages/customer/partnerPage/PartnerDetailedPage'
import BookingPage from '../components/customer/booking/BookingPage';
import Map from '../components/customer/map/Map';
import AppointmentBooking from '../components/customer/AppointmentBooking/AppointmentBooking';
import BusinessHome from '../Pages/customer/Business/BusinessHome';
// import HelpDesk from '../Pages/customer/CustomerTickets/HelpDesk';

const CustomerRoutes = () => {
  return (
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/profile" element={<Profile />} />
       <Route path='/partnersView' element={< PartnerListPage/>}/>
       <Route path="/detaildPage/:partnerId" element={<PartnerDetailedPage/>} />
       <Route path="/payment" element={<BookingPage/>} />
       <Route path='/map' element={<Map/>}/>
       <Route path='/appointmentBooking/:serviceId' element={<AppointmentBooking/>}/>
       <Route path='/for-business' element={<BusinessHome />}/>
       {/* <Route path='/helpdesk' element= {<HelpDesk />}/> */}
    </Routes>
  );
};

export default CustomerRoutes;
