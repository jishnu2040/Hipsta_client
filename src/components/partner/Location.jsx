import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { setLat, setLng } from '../../Redux/slices/partnerSlice';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
  height: '100%',
  width: '100%'
};

const center = {
  lat: 12.9250,
  lng: 77.6229
};

const libraries = ['places'];
const googleMapsApiKey = 'AIzaSyD8rS9O4Zj7NL3PEfVChzHiyB0Z0-4yIu4';

const Location = ({ nextStep, previousStep}) => {
  const [mapPosition, setMapPosition] = useState(center);
  const [address, setAddress] = useState('');
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);
  const navigate = useNavigate();

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries
  });

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const marker = new window.google.maps.Marker({
        position: mapPosition,
        map: mapRef.current,
        title: 'Selected Location',
        draggable: true,
      });

      marker.addListener('dragend', () => {
        const newPosition = marker.getPosition();
        const lat = newPosition.lat();
        const lng = newPosition.lng();
        setMapPosition({ lat, lng });
        localStorage.setItem('latitude', lat);
        localStorage.setItem('longitude', lng);

      });

      return () => {
        google.maps.event.clearListeners(marker, 'dragend');
      };
    }
  }, [isLoaded, mapPosition]);

  useEffect(() => {
    if (isLoaded && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('address-input')
      );
      autocomplete.setFields(['address_component', 'geometry']);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const { location } = place.geometry;
          const lat = location.lat();
          const lng = location.lng();
          setMapPosition({
            lat,
            lng
          });
          setAddress(place.formatted_address);
          localStorage.setItem('latitude', lat);
          localStorage.setItem('longitude', lng);
         
        }
      });
      autocompleteRef.current = autocomplete;
    }
  }, [isLoaded]);

  const handleSubmit = () => {
    if (mapPosition.length === 0) {
      alert('Please mark your point.');
      return;
    }
    nextStep();
  };

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
    <div style={{ marginBottom: '10px' }}>
      <input
        id="address-input"
        type="text"
        placeholder="Enter your address"
        style={{ width: '100%', padding: '8px' }}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapPosition}
        zoom={14}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onClick={(e) => {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          setMapPosition({ lat, lng });
          setAddress('');
          localStorage.setItem('latitude', lat);
          localStorage.setItem('longitude', lng);
        }}
      />
    </div>
    <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={previousStep}
            className="text-gray-800 px-6 py-2 rounded-lg font-semibold hover:text-blue-600 transition duration-200"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition duration-200"
          >
            Next
          </button>
    </div>
  </div>
  );
};

export default Location;
