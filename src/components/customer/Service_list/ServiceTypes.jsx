import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ServiceTypes = ({ small = false }) => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8000/api/v1';

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${baseUrl}/core/service_type/`);
        if (response.status === 200) {
          setServices(response.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (serviceId) => {
    navigate(`/partnersView?serviceId=${serviceId}`);
  };

  return (
    <div>
      <h2 className={`${small ? 'text-base' : 'md:text-3xl'} font-medium mt-4 text-start`}>
        {small ? 'Services' : 'Discover Our Services'}
      </h2>
      <div className={`grid ${small ? 'grid-cols-3 gap-2 p-' : 'grid-cols-2 sm:grid-cols-4 gap-6'}`}>
        {services.map((service) => (
          <div
            key={service.id}
            className={`max-w-sm mx-auto ${small ? 'h-16 w-20' : 'h-32'} bg-white shadow-md rounded-lg p-2 hover:shadow-xl transition-shadow duration-300`}
            onClick={() => handleServiceClick(service.id)}
          >
            {service.image && (
              <img
                src={service.image}
                alt={service.name}
                className={`w-full ${small ? 'h-12' : 'h-full'} object-contain`}
              />
            )}
            <div className="text-center mt-1">
              {!small && (
                <h3 className="text-lg font-semibold">
                  {service.name}
                </h3>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceTypes;
