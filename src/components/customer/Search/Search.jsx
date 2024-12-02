import React, { useState } from "react";
import NominatimAutocomplete from "./NominatimAutocomplete";
import ServiceAutocomplete from "./ServiceAutocomplete";

const Search = ({ onPlaceSelected, onServiceSelected }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedService, setSelectedService] = useState("");

  const handleSearch = () => {
    console.log("Searching with:", { location: selectedPlace,service: selectedService });
  };

  return (
    <div className="p-3 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Search for a Service</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <NominatimAutocomplete onPlaceSelected={(place) => {
            setSelectedPlace(place);
            onPlaceSelected(place);
          }} />
        </div>
        <div className="flex-1">
          <ServiceAutocomplete onServiceSelected={(service) => {
            setSelectedService(service);
            onServiceSelected(service);
          }} />
        </div>
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
