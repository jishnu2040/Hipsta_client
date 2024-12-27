import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditServiceModal from './EditServiceModal';

const Catalog = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchServices = async () => {
      if (!userId) {
        setError('User ID not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/v1/partner/${userId}/services/`);
        setServices(response.data);
        setLoading(false);

        if (response.data && response.data.length > 0) {
          const partnerId = response.data[0].partner_id; 
          localStorage.setItem('partnerId', partnerId);
        }
      } catch (error) {
        setError('Failed to fetch services. Please try again later.');
        setLoading(false);
      }
    };

    fetchServices();
  }, [userId]);

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    if (userId) {
      axios.get(`http://localhost:8000/api/v1/partner/${userId}/services/`)
        .then((response) => setServices(response.data));
    }
  };

  const getStatusColor = (status) => ({
    active: 'bg-green-500',
    inactive: 'bg-blue-500',
    suspended: 'bg-red-500',
  })[status] || 'bg-gray-500';

  if (loading) 
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) 
    return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Services Catalog</h2>
        <Link 
          to="/partner/catalog/new-service" 
          className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Service
        </Link>
      </div>

      <ul className="divide-y divide-gray-200">
        {services.map((service) => (
          <li key={service.id} className="py-4 px-6 flex items-center justify-between hover:bg-gray-100">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
              <div className="flex items-center mt-2">
                <span className="text-gray-600 mr-2">Duration:</span>
                <span className="font-medium">{service.duration}</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className={`px-3 py-1 text-white rounded-md ${getStatusColor(service.status)}`}>
                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
              </span>
              <button 
                onClick={() => openModal(service)} 
                className="ml-4 text-sm font-medium text-indigo-500 hover:text-indigo-700"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <EditServiceModal 
          service={selectedService} 
          onClose={closeModal} 
          onUpdate={handleUpdate} 
        />
      )}
    </div>
  );
};

export default Catalog;