import React, { useState } from 'react';
import { FaCashRegister, FaCreditCard } from 'react-icons/fa';

const Confirmation = ({ bookingData }) => {
  const [paymentMethod, setPaymentMethod] = useState('payAtVenue');
  const [notes, setNotes] = useState('');

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg space-y-6">


      {/* Payment Method Section */}
      <div className="bg-white p-6 shadow-sm rounded-md">
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="payAtVenue"
              checked={paymentMethod === 'payAtVenue'}
              onChange={() => handlePaymentMethodChange('payAtVenue')}
              className="h-4 w-4"
            />
            <span className="flex items-center gap-2">
              <FaCashRegister className="text-green-500 h-5 w-5" />
              Pay at Venue
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="cardPayment"
              checked={paymentMethod === 'cardPayment'}
              onChange={() => handlePaymentMethodChange('cardPayment')}
              className="h-4 w-4"
            />
            <span className="flex items-center gap-2">
              <FaCreditCard className="text-blue-500 h-5 w-5" />
              Card Payment
            </span>
          </label>
        </div>
      </div>

      {/* Booking Notes Section */}
      <div className="bg-white p-6 shadow-sm rounded-md">
        <label htmlFor="bookingNotes" className="block text-lg font-medium mb-4">
          Booking Notes (Optional)
        </label>
        <textarea
          id="bookingNotes"
          value={notes}
          onChange={handleNotesChange}
          placeholder="Add any special requests or instructions..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 resize-none"
          maxLength="100"
          rows="2"
        ></textarea>
      </div>
    </div>
  );
};

export default Confirmation;
