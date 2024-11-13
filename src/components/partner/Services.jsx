import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCut, FaSpa, FaLeaf, FaHands } from 'react-icons/fa';

// CSS spinner styles using Tailwind classes
const spinnerStyles = 'inline-block w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin';

const Services = ({ nextStep, previousStep }) => {
  const [serviceCategories, setServiceCategories] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceTypes = async () => {
      setStatus('loading');
      try {
        const response = await axios.get('http://localhost:8000/api/v1/partner/service_type/');
        setServiceCategories(response.data);
        setStatus('succeeded');
      } catch (err) {
        setError('Failed to fetch service categories');
        setStatus('failed');
      }
    };

    fetchServiceTypes();
  }, []);

  // Load selected services from localStorage on mount
  useEffect(() => {
    const savedServices = JSON.parse(localStorage.getItem('selectedServices'));
    if (savedServices) {
      setSelectedServices(savedServices);
    }
  }, []);

  // Save selected services to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
  }, [selectedServices]);

  const handleServiceSelect = (serviceId) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };

  const handleSubmit = () => {
    if (selectedServices.length === 0) {
      alert('Please select at least one service.');
      return;
    }
    nextStep();
  };

  const getServiceIcon = (serviceName) => {
    switch (serviceName.toLowerCase()) {
      case 'salon':
        return <FaCut className="text-indigo-500 text-3xl" />;
      case 'spa':
        return <FaSpa className="text-indigo-500 text-3xl" />;
      case 'skin-care':
        return <FaLeaf className="text-indigo-500 text-3xl" />;
      case 'massage':
        return <FaHands className="text-indigo-500 text-3xl" />;
      default:
        return null;
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
          <div className="flex justify-center items-center space-x-4">
            <div className={spinnerStyles}></div>
            <p>Loading Services...</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">What services are you looking for?</h2>
        <p className="text-center mb-6 sm:block hidden">Please let us know what role best describes you.</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {serviceCategories.map((service) => (
            <div
              key={service.id}
              className={`flex flex-col items-center justify-center border p-4 rounded-lg cursor-pointer hover:bg-gray-200 ${
                selectedServices.includes(service.id) ? 'bg-indigo-200' : ''
              }`}
              onClick={() => handleServiceSelect(service.id)}
            >
              <label className="flex flex-col items-center">
                {getServiceIcon(service.name)}
                <span className="mt-2 text-lg font-medium text-center">{service.name}</span>
              </label>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={previousStep}
            className="text-gray-800 px-6 py-2 rounded-lg font-semibold hover:text-blue-600 transition duration-200"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;
