import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Services = ({ partnerId }) => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('all');

  const baseUrl = 'http://localhost:8000/api/v1';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${baseUrl}/customer/service/`, {
          params: { partnerId },
        });

        const servicesData = response.data;
        setServices(servicesData);
        setFilteredServices(servicesData);

        const uniqueTypes = [
          'all',
          ...new Set(servicesData.map((service) => service.business_type_name)),
        ];
        setServiceTypes(uniqueTypes);
      } catch (error) {
        setError('Failed to fetch services');
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    if (partnerId) {
      fetchServices();
    }
  }, [partnerId]);

  const handleFilterChange = (type) => {
    setSelectedType(type);
    if (type === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(
        services.filter(
          (service) => service.business_type_name.toLowerCase() === type.toLowerCase()
        )
      );
    }
  };

  const handleBookClick = (serviceId) => {
    navigate(`/appointmentBooking/${serviceId}`);
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading services...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (services.length === 0) {
    return <div className="text-gray-600 text-center">No services available for this partner.</div>;
  }

  return (
    <div className="services-container mt-2">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Services</h2>

      {/* Filter Menu */}
      <div className="mb-4 flex flex-wrap gap-4">
        {serviceTypes.map((type) => (
          <button
            key={type}
            className={`px-3 py-2 rounded-full font-medium transition ${
              selectedType === type
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleFilterChange(type)}
          >
            {type === 'all' ? 'All Services' : type}
          </button>
        ))}
      </div>

      {/* Vertical Services List */}
    <ul className="md:space-y-4">
        {filteredServices.map((service) => (
          <li
            key={service.id}
            className="p-2 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">

              <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-2xl font-semibold">
                  {service.name.charAt(0).toUpperCase()}
                </span>
              </div>

       
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
                {/* <p className="text-gray-600">{service.description || 'No description available.'}</p> */}
              </div>

              <div className="flex flex-col  text-right">
                <span className="text-gray-700 font-medium">₹{service.price}</span>
                <span className="text-sm text-green-600">
                  {service.duration
                    .split(":")
                    .map((part, index) => {
                      if (index === 0 && part !== "00") return `${part} hr`; // Hours
                      if (index === 1 && part !== "00") return `${part} min`; // Minutes
                      return ""; // Remove seconds or "00"
                    })
                    .filter(Boolean)
                    .join(" ")}
                </span>

              </div>
            </div>

            {/* Book Button */}
            <div className="mt-4 text-right">
              <button
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                onClick={() => handleBookClick(service.id)}
              >
                Book Now
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
