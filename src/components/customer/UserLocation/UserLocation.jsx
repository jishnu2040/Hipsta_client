import React, { useState, useEffect } from 'react';

const UserLocation = ({ onClose, setLocation }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          onClose(); // Close the modal after obtaining the location
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not available');
    }
  }, [onClose, setLocation]);

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <p>Getting your location...</p>
      )}
    </div>
  );
};

export default UserLocation;
