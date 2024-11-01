import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Geocode from 'react-geocode';

// Set your Google Maps API key
Geocode.setApiKey('AIzaSyD8rS9O4Zj7NL3PEfVChzHiyB0Z0-4yIu4');
Geocode.enableDebug();

const containerStyle = {
  width: '100%',
  height: '300px',
};

const MapComponent = ({ center, zoom }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyD8rS9O4Zj7NL3PEfVChzHiyB0Z0-4yIu4',
  });

  const [markerPosition, setMarkerPosition] = useState(center);

  const handleMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
    >
      <Marker
        position={markerPosition}
        draggable={true}
        onDragEnd={handleMarkerDragEnd}
      />
    </GoogleMap>
  ) : (
    <div>Loading...</div>
  );
};

export default MapComponent;
