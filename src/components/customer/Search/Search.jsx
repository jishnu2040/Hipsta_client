import React, { useState } from "react";
import NominatimAutocomplete from "./NominatimAutocomplete";
import ServiceAutocomplete from "./ServiceAutocomplete";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedService, setSelectedService] = useState(null);


  // console.log("Navigating with:");
  // console.log("Place:", selectedPlace);
  // console.log("Service:", selectedService);
  

  const navigate = useNavigate();

  // Handle location selection
  const handlePlaceSelected = (place) => {
    setSelectedPlace(place);
  };

  // Handle service selection
  const handleServiceSelected = (serviceId, serviceName) => {
    setSelectedService({ id: serviceId, name: serviceName });
  };

  const handleSearch = () => {
    if (selectedPlace && selectedService) {
      navigate("/partnersView", {
        state: { location: selectedPlace, service: selectedService },
      });
    } else {
      console.error("Both selectedPlace and selectedService are required.");
    }
  };
  
  return (
    <div className="p-3 rounded shadow">
      <h2 className="text-xl font-bold ">Search for a Service</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Location Autocomplete */}
        <div className="flex-1">
          <NominatimAutocomplete onPlaceSelected={handlePlaceSelected} />
        </div>

        {/* Service Autocomplete */}
        <div className="flex-1">
          <ServiceAutocomplete
            onServiceSelected={(id, name) => handleServiceSelected(id, name)}
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-gray-700 text-white font-bold rounded hover:bg-gray-900 transition duration-200"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
