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

  // Retrieve userId from local storage
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Fetch services for the partner based on userId
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

        // Assuming the partner id is available in the response data
        if (response.data && response.data.length > 0) {
          // Save the partner ID in local storage, assuming the first service belongs to the partner
          const partnerId = response.data[0].partner_id; // Adjust based on your actual API response structure
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
    // Refresh services after update
    if (userId) {
      axios.get(`http://localhost:8000/api/v1/partner/${userId}/services/`).then((response) => {
        setServices(response.data);
      });
    }
  };

  // Simple Loader Component
  const Loader = () => (
    <div className="flex justify-center items-center my-10">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'; 
      case 'inactive':
        return 'bg-blue-500'; 
      case 'suspended':
        return 'bg-red-500'; 
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Services Catalog</h2>
        <Link
          to="/partner/catalog/new-service"
          className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-gray-900 to-indigo-600 rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg transition-all transform hover:scale-105"
        >
          + Add New Service
        </Link>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.length > 0 ? (
          services.map((service) => (
            <div
              key={service.id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">{service.name}</h3>
              <p className="text-gray-600 mb-3">{service.description}</p>
              <p className="text-gray-600 mb-3">Duration: <span className="font-medium">{service.duration}</span></p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-lg font-semibold text-gray-700">Price :
                  {parseFloat(service.price).toFixed(2)}
                </p>
                <div className={`px-3 py-1 text-white rounded-md ${getStatusColor(service.status)}`}>
                  {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                </div>
                <button
                  onClick={() => openModal(service)}
                  className="text-sm font-medium text-indigo-500 hover:text-indigo-700 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No services available. Please add a new service.</p>
        )}
      </div>

      {/* Modal */}
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
