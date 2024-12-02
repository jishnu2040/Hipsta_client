import React, { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";

const NominatimAutocomplete = ({ onPlaceSelected }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (!value) {
      return setSuggestions([]);
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${value}&countrycodes=IN&format=json&addressdetails=1`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleSuggestionClick = (place) => {
    const selectedLocation = {
      address: place.display_name,
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
    };
    onPlaceSelected(selectedLocation);
    setQuery(place.display_name);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <div className="flex items-center border p-2 rounded w-full">
        <FaLocationArrow className="text-gray-500 mr-2" />
        <input
          type="text"
          value={query}
          onChange={fetchSuggestions}
          placeholder="Search Location"
          className="w-full border-none outline-none"
          aria-label="Search for location"
        />
      </div>
      {suggestions.length > 0 && (
        <ul
          className="absolute top-full left-0 w-full bg-white border mt-1 z-20 max-h-48 overflow-y-auto shadow-lg"
          role="listbox"
        >
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(place)}
              role="option"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NominatimAutocomplete;
