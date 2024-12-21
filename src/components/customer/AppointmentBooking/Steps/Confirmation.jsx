import React, { useState } from 'react';
import { FaCashRegister } from 'react-icons/fa';

const Confirmation = ({ bookingData, setBookingData }) => {
  const [notes, setNotes] = useState(bookingData.notes || '');

  const handleNotesChange = (event) => {
    const newNotes = event.target.value;
    setNotes(newNotes);
    setBookingData((prevData) => ({
      ...prevData,
      notes: newNotes, 
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg space-y-6">
      {/* Payment Method Section */}
      <div className="bg-white p-6 shadow-sm rounded-md">
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
        <div className="flex items-center gap-4">
          <FaCashRegister className="text-green-500 h-6 w-6" />
          <span className="text-lg font-medium text-gray-700">Pay at Venue</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          This payment option allows you to pay directly at the venue during your appointment.
        </p>
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
