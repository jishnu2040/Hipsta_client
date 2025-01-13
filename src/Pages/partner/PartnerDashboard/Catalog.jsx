import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditServiceModal from '../../../components/partner/partnerDashboard/EditServiceModal';
import NewService from '../../../components/partner/partnerDashboard/NewService';
import ThemeContext from '../../../ThemeContext';

const Catalog = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleUpdate = () => {
    if (userId) {
      axios.get(`http://localhost:8000/api/v1/partner/${userId}/services/`)
        .then((response) => setServices(response.data));
    }
  };

  const categorizedServices = services.reduce(
    (acc, service) => {
      acc[service.status] = acc[service.status] || [];
      acc[service.status].push(service);
      return acc;
    },
    {}
  );

  if (loading)
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error)
    return <p className="text-red-500">{error}</p>;

  return (
    <div className={`container mx-auto p-2 max-w ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl sm:text-4xl font-semibold">Services Catalog</h2>
        <button
          onClick={openDrawer}
          className={`inline-flex items-center px-2 py-2 rounded-md ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-900'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Service
        </button>
      </div>

      {['active', 'inactive', 'suspended'].map((status) => (
        categorizedServices[status]?.length > 0 && (
          <div key={status} className="mb-8">
            <h3 className={`text-2xl font-semibold capitalize ${status === 'suspended' ? 'text-red-500' : 'text-green-600'}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)} Services
            </h3>
            <ul className="space-y-3 mt-4">
              {categorizedServices[status].map((service) => (
                <li key={service.id} className={`py-4 px-6 flex items-center justify-between rounded-xl border gap-12 hover:${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div>
                    <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{service.name}</h4>
                    <p className="text-green-500">Amount: {service.price}</p>
                    <div className="flex items-center mt-2">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Duration:</span>
                      <span className="font-medium">{service.duration}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 text-green-500 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                    <button
                      onClick={() => openModal(service)}
                      className={`ml-4 text-sm font-medium ${isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-500 hover:text-indigo-700'}`}
                    >
                      Edit
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      ))}

      {isModalOpen && (
        <EditServiceModal
          service={selectedService}
          onClose={closeModal}
          onUpdate={handleUpdate}
        />
      )}

      {isDrawerOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-end z-50">
          <div className={`w-full md:w-[35%] h-full overflow-y-auto shadow-lg ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
            <button
              onClick={closeDrawer}
              className="p-2 text-lg hover:text-gray-600"
            >
              Close
            </button>
            <NewService />
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
