import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShimmerServiceTypes from './ShimmerServiceTypes';

const ServiceTypes = ({ small = false }) => {
  const [serviceTypes, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}core/service_type/`);
        if (response.status === 200) {
          setServices(response.data);
          setLoading(false); // Set loading to false once data is fetched
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false); // Stop loading even if there's an error
      }
    };

    fetchServices();
  }, []);

  const handleServiceClick = (serviceTypeId) => {
    navigate(`/partnersView?serviceTypeId=${serviceTypeId}`);
  };

  return (
    <div>
      <h2 className={`${small ? 'text-base' : 'md:text-3xl'} font-medium mt-4 ml-10 text-start`}>
        {small ? null : 'Discover Our Services'}
      </h2>

      {/* Loading Shimmer UI */}
      {loading ? (
        <ShimmerServiceTypes />
      ) : (
        <div className={`grid ${small ? 'grid-cols-4 sm:grid-cols-3 gap-2 p-4' : 'grid-cols-2 sm:grid-cols-4 gap-6 p-8'}`}>
          {serviceTypes.map((service) => (
            <div
              key={service.id}
              className={`max-w-sm mx-auto ${small ? 'h-24 w-20' : 'h-28'} bg-white rounded-lg p-2 hover:shadow-xl transition-shadow duration-300`}
              onClick={() => handleServiceClick(service.id)}
            >
              {service.image && (
                <img
                  src={service.image}
                  alt={service.name}
                  className={`w-full ${small ? 'h-16' : 'h-full'} object-contain`}
                />
              )}
              <div className="text-center">
                <h3 className={`${small ? 'text-sm' : 'text-lg'} font-semibold`}>
                  {service.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceTypes;
