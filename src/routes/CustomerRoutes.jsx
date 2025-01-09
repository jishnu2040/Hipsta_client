import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/customer/Home/Home';
import ProfilePage from '../Pages/customer/ProfilePage/ProfilePage';
import PartnerListPage from '../Pages/customer/PartnerList/PartnerListPage';
import PartnerDetailedPage from '../Pages/customer/partnerPage/PartnerDetailedPage'
import BookingPage from '../components/customer/booking/BookingPage';
import Map from '../components/customer/map/Map';
import AppointmentBooking from '../components/customer/AppointmentBooking/AppointmentBooking';
import BusinessHome from '../Pages/customer/Business/BusinessHome';
import PersonalDetails from '../components/customer/profile/PersonalDetails';
import Bookings from '../components/customer/profile/Bookings';
// import HelpDesk from '../Pages/customer/CustomerTickets/HelpDesk';

const CustomerRoutes = () => {
  return (
    <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/profile" element={<ProfilePage />}>
          {/* Nested routes to render in the Outlet */}
          <Route path="" element={<PersonalDetails />} />
          <Route path="bookings" element={<Bookings />} />
       </Route>
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
