import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const baseUrl = 'http://localhost:8000/api/v1'; // Replace with your API base URL

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${baseUrl}/core/service_type/`);
        if (response.status === 200) {
          setServices(response.data); // API response is an array of service objects
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div >
      <h2 className="text-4xl font-medium mb-3 text-start">Discover Our Services</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service) => (
          <div key={service.id} className="max-w-sm mx-auto h-32  bg-white shadow-md rounded-lg p-2 hover:shadow-xl transition-shadow duration-300">
            {service.image && (
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-contain "
              />
            )}
            <div className="text-center mt-1">
              <h3 className="text-lg font-bold ">{service.name}</h3>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;