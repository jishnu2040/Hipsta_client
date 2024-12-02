import React, { useEffect, useState } from "react";
import { FaSpa } from "react-icons/fa";

const ServiceAutocomplete = ({ onServiceSelected }) => {
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/core/services");
        const data = await response.json();
        setServices(data.map((service) => service.name));
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = services.filter((service) =>
      service.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions.slice(0, 10));
  };

  const handleSuggestionClick = (service) => {
    onServiceSelected(service);
    setQuery(service);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      <div className="flex items-center border p-2 rounded w-full">
        <FaSpa className="text-gray-500 mr-2" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search Service"
          className="w-full border-none outline-none"
          aria-label="Search for services"
        />
      </div>
      {suggestions.length > 0 && (
        <ul
          className="absolute top-full left-0 w-full bg-white border mt-1 z-20 max-h-48 overflow-y-auto shadow-lg"
          role="listbox"
        >
          {suggestions.map((service, idx) => (
            <li
              key={idx}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(service)}
              role="option"
            >
              {service}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceAutocomplete;
