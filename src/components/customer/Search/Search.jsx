import React, { useState } from "react";
import NominatimAutocomplete from "./NominatimAutocomplete";
import ServiceAutocomplete from "./ServiceAutocomplete";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedServiceName, setSelectedServiceName] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");

  const navigate = useNavigate();

  // Handle location selection
  const handlePlaceSelected = (place) => {
    console.log("Selected Place:", place);
    setSelectedPlace(place);
  };

  // Handle service selection
  const handleServiceSelected = (serviceId, serviceName) => {
    console.log("Selected Service ID:", serviceId, "Name:", serviceName);
    setSelectedServiceId(serviceId);
    setSelectedServiceName(serviceName);

    // Save the service ID to localStorage
    localStorage.setItem("selectedServiceId", serviceId);
  };

  const handleSearch = () => {
    navigate("/partnersView");
    // Perform your search logic here
  };

  return (
    <div className="p-3 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Search for a Service</h2>
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
