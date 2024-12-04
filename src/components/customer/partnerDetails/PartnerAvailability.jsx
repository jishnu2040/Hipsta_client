import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PartnerAvailability = ({ partnerId }) => {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${String(minutes).padStart(2, '0')} ${period}`;
  };

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/partner/${partnerId}/availability/`
        );
        setAvailabilities(response.data);
      } catch (err) {
        setError('Failed to fetch availability');
        console.error('Error fetching availability:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailability();
  }, [partnerId]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Availability</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : availabilities.length > 0 ? (
        <ul>
          {availabilities.map((availability) => (
            <li key={availability.id} className="mb-1">
              {availability.is_weekly
                ? `${availability.weekday}: `
                : `${availability.specific_date}: `}
              {formatTime(availability.start_time)} - {formatTime(availability.end_time)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No availability found for this partner.</p>
      )}
    </div>
  );
};

export default PartnerAvailability;
