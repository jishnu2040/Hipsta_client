import React, { useState, useEffect } from 'react';

const UserLocation = ({ onClose, setLocation }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setLoading(false);
          onClose(); // Automatically close modal
        },
        (error) => {
          setError(`Error: ${error.message}`);
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  }, [onClose, setLocation]);

  return (
    <div className="text-center">
      {loading && !error ? (
        <div className="text-indigo-500 font-medium">Fetching your location...</div>
      ) : error ? (
        <div className="text-red-500 font-medium">{error}</div>
      ) : null}
    </div>
  );
};

export default UserLocation;
