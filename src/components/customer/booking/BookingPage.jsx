import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentWrapper from '../payment/PaymentForm';

const BookingPage = () => {
  const location = useLocation();
  const appointmentData = location.state?.appointmentData || {};

  console.log(appointmentData )

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <PaymentWrapper
        totalAmount={appointmentData.total_amount}
        appointmentData={appointmentData}
      />
    </div>
  );
};

export default BookingPage;
