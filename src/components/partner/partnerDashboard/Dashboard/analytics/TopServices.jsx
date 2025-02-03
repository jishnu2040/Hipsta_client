import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import ThemeContext from "../../../../../ThemeContext";

const TopServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch partnerId from localStorage
  const partnerId = localStorage.getItem('partnerId');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  // Access the theme context
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (partnerId) {
      // Fetch the top services for the given partner ID
      axios
        .get(`${API_BASE_URL}partner/${partnerId}/topServices/`)
        .then((response) => {
          setServices(response.data); // Set the fetched service data
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching top services:', error);
          setLoading(false);
        });
    } else {
      console.error('Partner ID not found in localStorage');
      setLoading(false);
    }
  }, [partnerId]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div
      className={`p-6 shadow-lg rounded-lg ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h3
        className={`text-2xl font-semibold mb-4 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Top Services
      </h3>
      <ul>
        {services.length === 0 ? (
          <li>No services found.</li>
        ) : (
          services.map((service) => (
            <li
              key={service.id}
              className={`flex justify-between items-center py-3 border-b ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } last:border-b-0`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center text-xl font-semibold ${
                    isDarkMode
                      ? "bg-blue-500 text-gray-900"
                      : "bg-blue-200 text-white"
                  }`}
                >
                  {service.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {service.name}
                  </p>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Total Appointments
                  </p>
                </div>
              </div>
              <span
                className={`text-xl font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              >
                {service.total_appointments}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TopServices;
