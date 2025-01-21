import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PartnerAvailability = ({ partnerId }) => {
  const [availabilities, setAvailabilities] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading', 'error', or 'success'

  // Format time to 12-hour clock
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${String(minutes).padStart(2, '0')} ${period}`;
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const { data: availabilityData } = await axios.get(
          `http://localhost:8000/api/v1/customer/${partnerId}/availability/`
        );
        setAvailabilities(availabilityData);

        const { data: holidayData } = await axios.get(
          `http://localhost:8000/api/v1/partner/${partnerId}/holidays/`
        );
        setHolidays(holidayData);

        setStatus('success');
      } catch (error) {
        console.error('Error fetching data:', error);
        setStatus('error');
      }
    };

    fetchAvailability();
  }, [partnerId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {status === 'loading' && (
        <p className="text-gray-500 animate-pulse">Loading data...</p>
      )}
      {status === 'error' && (
        <p className="text-red-500">Failed to fetch data. Please try again later.</p>
      )}
      {status === 'success' && (
        <>
          <div>
            <h4 className="text-xl font-semibold text-gray-600 mb-4">Available Slots</h4>
            {availabilities.length === 0 ? (
              <p className="text-gray-600">No availability found for this partner.</p>
            ) : (
              <ul className="space-y-2">
                {availabilities.map((availability) => (
                  <li
                    key={availability.id}
                    className="text-cyan-700 text-lg flex justify-between items-center"
                  >
                    <span>
                      {availability.is_weekly ? `${availability.weekday}` : availability.specific_date}
                    </span>
                    <span>
                      {formatTime(availability.start_time)} - {formatTime(availability.end_time)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-600 mb-4">Holidays</h4>
            {holidays.length === 0 ? (
              <p className="text-gray-600 ">No holidays found for this partner.</p>
            ) : (
              <ul className="space-y-2">
                {holidays.map((holiday) => (
                  <li
                    key={holiday.id}
                    className="text-red-800 text-lg flex justify-between items-center"
                  >
                    <span>{holiday.date}</span>
                    <span>{holiday.description || 'No description provided'}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PartnerAvailability;
