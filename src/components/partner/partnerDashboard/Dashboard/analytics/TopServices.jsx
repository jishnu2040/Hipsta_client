import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch partnerId from localStorage
  const partnerId = localStorage.getItem('partnerId');

  useEffect(() => {
    if (partnerId) {
      // Fetch the top services for the given partner ID
      axios
        .get(`http://localhost:8000/api/v1/partner/${partnerId}/topServices/`)
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
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Top Services</h3>
      <ul>
        {services.length === 0 ? (
          <li>No services found.</li>
        ) : (
          services.map((service) => (
            <li
              key={service.id}
              className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center text-xl font-semibold text-white">
                  {service.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{service.name}</p>
                  <p className="text-sm text-gray-600">Total Appointments</p>
                </div>
              </div>
              <span className="text-xl font-semibold text-gray-700">
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
