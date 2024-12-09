import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

const Services = ({ partnerId }) => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]); // Dynamically set service types
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState('all'); // Default to show all services

  const baseUrl = 'http://localhost:8000/api/v1';
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${baseUrl}/customer/service/`, {
          params: { partnerId },
        });

        const servicesData = response.data;
        setServices(servicesData);
        setFilteredServices(servicesData);

        // Dynamically get service types
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
    const currentScrollPosition = window.scrollY; // Store the current scroll position
    setSelectedType(type);

    if (type === 'all') {
      setFilteredServices(services); // Show all services
    } else {
      setFilteredServices(
        services.filter(
          (service) => service.business_type_name.toLowerCase() === type.toLowerCase()
        )
      );
    }

    // Restore the scroll position after state update
    setTimeout(() => {
      window.scrollTo(0, currentScrollPosition);
    }, 0);
  };

  const handleBookClick = (serviceId) => {
    // Navigate to the appointment page, passing the service ID as a parameter
    navigate(`/appointment/${serviceId}`);
  };

  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (services.length === 0) {
    return <div>No services available for this partner.</div>;
  }

  return (
    <div className="services-container mt-6">
      <h2 className="text-2xl font-semibold mb-4">Available Services</h2>

      {/* Filter Menu */}
      <div className="mb-6 flex gap-4">
        {serviceTypes.map((type) => (
          <button
            key={type}
            className={`px-4 py-2 rounded-lg font-semibold ${
              selectedType === type
                ? 'bg-gray-900 text-white'
                : 'bg-gray-50 text-gray-700'
            } hover:bg-gray-400 transition`}
            onClick={() => handleFilterChange(type)}
          >
            {type === 'all' ? 'All Services' : type}
          </button>
        ))}
      </div>

      {/* Services List */}
      <ul className="space-y-4">
        {filteredServices.map((service) => (
          <li
            key={service.id}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              {/* Service Name */}
              <h3 className="text-lg font-bold">{service.name}</h3>

              {/* Service Price and Duration in one line */}
              <div className="flex gap-4">
                <p className="font-medium">{service.price}</p>
                <p className="font-medium">{service.duration}</p>
              </div>
              <div className="mt-4">
              <button
                className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                onClick={() => handleBookClick(service.id)} // On click, navigate to the service page
              >
                Book
              </button>
            </div>
            </div>


            
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Services;
