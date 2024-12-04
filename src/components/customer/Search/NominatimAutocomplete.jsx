import React, { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import UserLocation from "../UserLocation/UserLocation";

const NominatimAutocomplete = ({ onPlaceSelected }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

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

      // Removed filtering: Include all results, not just cities
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };

  const handleSuggestionClick = (place) => {
    const selectedLocation = {
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
    };

    // Save only lat and lng to local storage
    localStorage.setItem("userLocation", JSON.stringify(selectedLocation));

    // Notify parent component
    onPlaceSelected(selectedLocation);

    // Update input and clear suggestions
    setQuery(place.display_name);
    setSuggestions([]);
  };

  const handleUseCurrentLocation = () => {
    setShowUserLocation(true);
  };

  const handleLocationSet = (location) => {
    localStorage.setItem("userLocation", JSON.stringify(location));
    onPlaceSelected(location);
    setQuery(""); // Clear input
    setSuggestions([]); // Clear suggestions

    // Set feedback message
    setFeedbackMessage("Location replaced with current location.");

    // Clear feedback message after 3 seconds
    setTimeout(() => setFeedbackMessage(""), 3000);
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

      {feedbackMessage && (
        <div className="absolute top-full left-0 w-full bg-green-100 text-green-700 p-2 mt-1 rounded-md text-center">
          {feedbackMessage}
        </div>
      )}

      {showUserLocation && (
        <div className="absolute z-30 top-0 left-0 w-full bg-white border p-4 shadow-lg">
          <UserLocation
            onClose={() => setShowUserLocation(false)}
            setLocation={handleLocationSet}
          />
        </div>
      )}

      {suggestions.length > 0 && (
        <ul
          className="absolute top-full left-0 w-full bg-white border mt-1 z-20 max-h-48 overflow-y-auto shadow-lg"
          role="listbox"
        >
          <li
            className="p-2 cursor-pointer hover:bg-gray-100 font-medium text-blue-600"
            onClick={handleUseCurrentLocation}
          >
            Use Current Location
          </li>
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
