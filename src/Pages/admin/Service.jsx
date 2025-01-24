import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Service = () => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [editServiceId, setEditServiceId] = useState(null);
  const [error, setError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch service types
  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}core/service-types/`);
        setServiceTypes(response.data);
      } catch (error) {
        setError('Error fetching service types');
      }
    };

    fetchServiceTypes();
  }, []);

  // Create or update a service type
  const handleSaveServiceType = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      if (editServiceId) {
        await axios.patch(`${API_BASE_URL}core/service-types/${editServiceId}/`, formData);
        setEditServiceId(null);
      } else {
        await axios.post(`${API_BASE_URL}core/service-types/`, formData);
      }
      setName('');
      setDescription('');
      setImage(null);
      // Refresh the list
      const response = await axios.get(`${API_BASE_URL}core/service-types/`);
      setServiceTypes(response.data);
    } catch (error) {
      setError('Error saving service type');
    }
  };

  // Delete a service type
  const handleDeleteServiceType = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}core/service-types/${id}/`);
      setServiceTypes(serviceTypes.filter((service) => service.id !== id));
    } catch (error) {
      setError('Error deleting service type');
    }
  };

  // Handle edit
  const handleEditServiceType = (service) => {
    setName(service.name);
    setDescription(service.description);
    setEditServiceId(service.id);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Manage Service Types</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">{editServiceId ? 'Edit Service Type' : 'Create Service Type'}</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Service Name"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Service Description"
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSaveServiceType}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            {editServiceId ? 'Update Service' : 'Save Service'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceTypes.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            {service.image && (
              <img src={service.image} alt={service.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            )}
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditServiceType(service)}
                className="text-yellow-500 hover:text-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteServiceType(service.id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
