import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation hooks

const AddServices = ({ partnerId }) => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = 'http://localhost:8000/api/v1';
  const navigate = useNavigate();
  const location = useLocation();

  // Get previously selected services from the previous page (e.g., via location state)
  const { selectedServicesFromPreviousPage = [] } = location.state || {};

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${baseUrl}/customer/service/`, {
          params: { partnerId },
        });
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch services');
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    if (partnerId) {
      fetchServices();
    }
  }, [partnerId]);

  useEffect(() => {
    // Mark services selected from the previous page
    setSelectedServices(selectedServicesFromPreviousPage);
  }, [selectedServicesFromPreviousPage]);

  const handleSelectService = (service) => {
    if (selectedServices.some((selected) => selected.id === service.id)) {
      // Deselect service if already selected
      setSelectedServices(selectedServices.filter((selected) => selected.id !== service.id));
    } else {
      // Select service
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleNextPage = () => {
    // Navigate to the next page and pass the selected services
    navigate('/next-page', { state: { selectedServices } });
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
      <h2 className="text-2xl font-semibold mb-4">Select Services</h2>

      {/* Services List */}
      <ul className="space-y-4">
        {services.map((service) => (
          <li
            key={service.id}
            className={`p-4 border rounded-lg shadow hover:shadow-lg transition-shadow ${
              selectedServices.some((selected) => selected.id === service.id)
                ? 'bg-blue-100'
                : ''
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Service Name */}
              <h3 className="text-lg font-bold">{service.name}</h3>

              {/* Service Price and Duration in one line */}
              <div className="flex gap-4">
                <p className="font-medium">{service.price}</p>
                <p className="font-medium">{service.duration}</p>
              </div>
            </div>

            {/* Add/Remove Button */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handleSelectService(service)}
                className={`${
                  selectedServices.some((selected) => selected.id === service.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-green-500 text-white'
                } px-4 py-2 rounded-lg hover:bg-opacity-80 transition`}
              >
                {selectedServices.some((selected) => selected.id === service.id)
                  ? 'Remove'
                  : 'Add'}{' '}
                <span className="text-xl">+</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Next Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleNextPage}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddServices;
