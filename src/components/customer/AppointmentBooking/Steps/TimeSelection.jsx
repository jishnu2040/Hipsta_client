import React, { useState, useEffect } from 'react';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { AiFillLock } from 'react-icons/ai'; // Lock icon
import axios from 'axios';

const TimeSelection = ({ setBookingData, bookingData }) => {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [timeCategory, setTimeCategory] = useState('morning'); // 'morning', 'afternoon', 'evening'

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
    if (timeSlot.is_locked) {
      alert('This slot is currently under booking. Please try again later.');
      return;
    }
    setBookingData({ ...bookingData, timeSlot });
  };

  const convertTo12Hour = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const getTimeCategory = (timeSlot) => {
    const [hours] = timeSlot.start_time.split(':').map(Number);
    if (hours < 12) return 'morning';
    if (hours >= 12 && hours < 17) return 'afternoon';
    return 'evening';
  };

  const filteredTimes = availableTimes.filter((timeSlot) => {
    const categoryMatch = getTimeCategory(timeSlot) === timeCategory;

    if (selectedDate === new Date().toISOString().split('T')[0]) {
      const now = new Date();
      const [hours, minutes] = timeSlot.start_time.split(':').map(Number);
      const slotTime = new Date();
      slotTime.setHours(hours, minutes, 0);

      return categoryMatch && slotTime >= now;
    }

    return categoryMatch;
  });

  useEffect(() => {
    if (bookingData.date) {
      setSelectedDate(bookingData.date);
      fetchAvailableTimes(bookingData.date);
    }
  }, [bookingData.date]);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-semibold mb-6">Select Date and Time</h2>

      <div className="mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => handleDateChange(e.target.value)}
          className="p-2 border rounded-lg w-full"
          min={new Date().toISOString().split('T')[0]} 
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

      {/* Time Categories Toggle */}
      <div className="flex justify-center mb-4">
        {['morning', 'afternoon', 'evening'].map((category) => (
          <button
            key={category}
            onClick={() => setTimeCategory(category)}
            className={`px-4 py-2 rounded-full ${
              timeCategory === category ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-700'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Time Slots */}
      <div className="grid grid-cols-4 gap-2 mt-6">
        {filteredTimes.length === 0 ? (
          <div className="col-span-4 flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg">
            <p className="text-xl font-semibold text-gray-700">No available times in {timeCategory}</p>
            <p className="text-sm text-red-500 mt-2">Please try another time category or date</p>
          </div>
        ) : (
          filteredTimes.map((timeSlot) => (
            <button
              key={timeSlot.id}
              onClick={() => handleTimeSelection(timeSlot)}
              className={`p-3 border rounded-lg text-sm cursor-pointer flex items-center justify-between ${
                bookingData.timeSlot?.id === timeSlot.id ? 'bg-green-500 text-white' : null
              }`}
            >
              <span>
                {`${convertTo12Hour(timeSlot.start_time)} - ${convertTo12Hour(timeSlot.end_time)}`}
              </span>
              {timeSlot.is_locked && <AiFillLock className="text-red-500 ml-2" />}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default TimeSelection;
