import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const openGoogleMaps = (lat, lng) => {
  window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
};

const Map = ({ partners }) => {
  if (!partners || partners.length === 0) {
    return <p className="text-gray-500">No location data available for partners.</p>;
  }

  // Calculate map center dynamically based on partner locations
  const calculateCenter = (partners) => {
    const latSum = partners.reduce((sum, partner) => sum + parseFloat(partner.latitude), 0);
    const lngSum = partners.reduce((sum, partner) => sum + parseFloat(partner.longitude), 0);
    return {
      lat: latSum / partners.length,
      lng: lngSum / partners.length,
    };
  };

  const mapCenter = calculateCenter(partners);

  return (
    <LoadScript googleMapsApiKey="AIzaSyD8rS9O4Zj7NL3PEfVChzHiyB0Z0-4yIu4">
      <GoogleMap
        mapContainerStyle={{ height: "500px", width: "100%" }}
        center={mapCenter}
        zoom={12} // Adjust zoom level as needed
      >
        {partners.map((partner) => {
          const lat = parseFloat(partner.latitude);
          const lng = parseFloat(partner.longitude);

          return (
            <Marker
              key={partner.id}
              position={{ lat, lng }}
              onClick={() => openGoogleMaps(lat, lng)}
              title={partner.business_name}
            />
          );
        })}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
