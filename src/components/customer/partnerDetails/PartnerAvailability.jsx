import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PartnerAvailability = ({ partnerId }) => {
  const [availabilities, setAvailabilities] = useState([]);
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
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/customer/${partnerId}/availability/`
        );
        setAvailabilities(data);
        setStatus('success');
      } catch (error) {
        console.error('Error fetching availability:', error);
        setStatus('error');
      }
    };

    fetchAvailability();
  }, [partnerId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold text-orange-500 mb-2">Availability</h3>
      {status === 'loading' && (
        <p className="text-gray-500 animate-pulse">Loading availability...</p>
      )}
      {status === 'error' && (
        <p className="text-red-500">Failed to fetch availability. Please try again later.</p>
      )}
      {status === 'success' && availabilities.length === 0 && (
        <p className="text-gray-600">No availability found for this partner.</p>
      )}
      {status === 'success' && availabilities.length > 0 && (
        <ul className="space-y-2">
          {availabilities.map((availability) => (
            <li
              key={availability.id}
              className="text-green-800 text-lg flex justify-between items-center"
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
  );
};

export default PartnerAvailability;
