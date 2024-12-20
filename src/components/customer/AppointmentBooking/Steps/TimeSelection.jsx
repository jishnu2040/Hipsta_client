import React, { useState, useEffect } from 'react';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import axios from 'axios';

const TimeSelection = ({ setBookingData, bookingData }) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const baseUrl = 'http://localhost:8000/api/v1';
  const selectedEmployee = bookingData?.employee?.id;

  const getNextSevenDays = () => {
    const days = [];
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(currentDate);
      nextDay.setDate(currentDate.getDate() + i);
      days.push(nextDay);
    }
    return days;
  };

  const fetchAvailableTimes = async (date) => {
    if (!selectedEmployee) return;

    try {
      const response = await axios.get(`${baseUrl}/customer/employee/${selectedEmployee}/available-times/`, {
        params: { date },
      });
      setAvailableTimes(response.data);
    } catch (error) {
      console.error('Error fetching available times:', error);
      setAvailableTimes([]);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setBookingData({ ...bookingData, date });
    fetchAvailableTimes(date);
  };

  const handleTimeSelection = (timeSlot) => {
    setBookingData({ ...bookingData, timeSlot });
  };

  useEffect(() => {
    if (bookingData.date) {
      setSelectedDate(bookingData.date);
      fetchAvailableTimes(bookingData.date);
    }
  }, [bookingData.date]);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-6">Select Date and Time</h2>

      {/* New Date Picker */}
      <div className="mb-4">
    
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="p-2 border rounded-lg w-full"
        />
      </div>

      {/* Circle Date Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => handleDateChange(getNextSevenDays()[0].toISOString().split('T')[0])}
          className="text-xl text-gray-600"
        >
          <HiChevronLeft />
        </button>

        <div className="flex gap-2 overflow-x-auto">
          {getNextSevenDays().map((day) => (
            <div key={day.toString()} className="text-center">
              <button
                onClick={() => handleDateChange(day.toISOString().split('T')[0])}
                className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${
                  selectedDate === day.toISOString().split('T')[0] ? 'bg-gray-800' : 'bg-blue-300'
                }`}
              >
                {day.getDate()}
              </button>
              <p className="text-sm text-gray-600 mt-1">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => handleDateChange(getNextSevenDays()[6].toISOString().split('T')[0])}
          className="text-xl text-gray-600"
        >
          <HiChevronRight />
        </button>
      </div>

      {/* Time Slots */}
      <ul className="mt-6">
  {availableTimes.length === 0 ? (
    <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg  ">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 12H6"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12"
        />
      
      <p className="text-xl font-semibold text-gray-700">No available times for the selected date</p>
      <p className="text-sm text-gray-500 mt-2">Please select another date or try again later</p>
    </div>
  ) : (
    availableTimes.map((timeSlot) => (
      <li
        key={timeSlot.id}
        onClick={() => handleTimeSelection(timeSlot)}
        className={`p-4 border rounded-lg cursor-pointer ${
          bookingData.timeSlot?.id === timeSlot.id ? 'bg-green-500 text-white' : 'bg-white'
        }`}
      >
        {timeSlot.start_time} - {timeSlot.end_time}
      </li>
    ))
  )}
</ul>


    </div>
  );
};

export default TimeSelection;
