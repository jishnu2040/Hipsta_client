import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ServiceProvide() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}core/service_type/`);
        setServices(response.data); // Assuming response data is an array of services
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="bg-gray-50 py-20 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold text-gray-800 sm:text-4xl">
          Services Provided by Hipsta
        </h2>
        <p className="mt-4 text-center text-lg text-gray-600">
          Explore a wide range of premium services tailored to your needs.
        </p>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-2 gap-x-10 gap-y-12 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col items-center space-y-4 rounded-lg bg-white p-6"
            >
              <div className="h-24 w-24 rounded-full bg-gray-100 overflow-hidden">
                <img
                  alt={service.name}
                  src={service.image} // Assuming the service object contains an 'image' field
                  className="h-full w-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <p className="text-center text-lg font-medium text-gray-800 group-hover:text-blue-600">
                {service.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
