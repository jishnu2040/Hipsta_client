import React, { useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const openGoogleMaps = (lat, lng) => {
  window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
};

const Map = ({ partners }) => {
  const mapRef = useRef(null);

  if (!partners || partners.length === 0) {
    return <p className="text-gray-500">No location data available for partners.</p>;
  }

  // Create bounds to include all markers
  const adjustMapBounds = () => {
    if (partners.length > 1) {
      const bounds = new window.google.maps.LatLngBounds();
      partners.forEach((partner) => {
        bounds.extend({
          lat: parseFloat(partner.latitude),
          lng: parseFloat(partner.longitude),
        });
      });
      mapRef.current.fitBounds(bounds);
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      adjustMapBounds();
    }
  }, [partners]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyD8rS9O4Zj7NL3PEfVChzHiyB0Z0-4yIu4">
      <GoogleMap
        mapContainerStyle={{ height: "500px", width: "100%" }}
        zoom={2} // Initial zoom (will be overridden by fitBounds)
        onLoad={(map) => {
          mapRef.current = map; // Save the map instance to ref
          adjustMapBounds();
        }}
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
