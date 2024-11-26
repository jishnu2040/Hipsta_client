import React, { useState, useEffect } from 'react';

const UserLocation = ({ onClose, setLocation }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    console.log('UserLocation component mounted');

    if ('geolocation' in navigator) {
      console.log('Geolocation is available in the navigator.');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Location obtained:', latitude, longitude); // Debug log
          setLocation({ lat: latitude, lng: longitude });
          console.log('Location state updated');
          setLoading(false); // Stop loading
          onClose(); // Close the modal after obtaining the location
          console.log('onClose callback executed');
        },
        (error) => {
          console.error('Error obtaining location:', error.message); // Debug log for errors
          setError(`Error: ${error.message}`);
          setLoading(false); // Stop loading if error occurs
        }
      );
    } else {
      console.warn('Geolocation is not available in this browser.');
      setError('Geolocation is not available');
      setLoading(false);
    }
  }, [onClose, setLocation]);

  return (
    <div className="user-location-container">
      {loading && !error ? (
        <p>Getting your location...</p>
      ) : error ? (
        <p>{error}</p>
      ) : null}
    </div>
  );
};

export default UserLocation;
