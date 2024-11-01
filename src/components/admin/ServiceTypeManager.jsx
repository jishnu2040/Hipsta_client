// src/components/ServiceTypeManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceTypeManager = () => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchServiceTypes();
  }, []);

  const fetchServiceTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/partner/service-types/');
      setServiceTypes(response.data);
    } catch (error) {
      console.error('Error fetching service types:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        if (editId) {
            await axios.patch(`http://localhost:8000/api/v1/partner/service-types/${editId}/`, { name, description });
        } else {
            await axios.post('http://localhost:8000/api/v1/partner/service-types/', { name, description });
        }
        fetchServiceTypes();
        setName('');
        setDescription('');
        setEditId(null);
    } catch (error) {
        console.error('Error saving service type:', error);
    }
};


  const handleEdit = (serviceType) => {
    setName(serviceType.name);
    setDescription(serviceType.description);
    setEditId(serviceType.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/partner/service-types/${id}/`);
      fetchServiceTypes();
    } catch (error) {
      console.error('Error deleting service type:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Service Type Management</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Service Name"
          className="p-2 border border-gray-300 rounded mr-2"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="p-2 border border-gray-300 rounded mr-2"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
          {editId ? 'Update Service' : 'Add Service'}
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">ID</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Description</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {serviceTypes.map(serviceType => (
              <tr key={serviceType.id} className="bg-white hover:bg-gray-50 transition duration-300">
                <td className="py-3 px-4 border-b">{serviceType.id}</td>
                <td className="py-3 px-4 border-b">{serviceType.name}</td>
                <td className="py-3 px-4 border-b">{serviceType.description}</td>
                <td className="py-3 px-4 border-b">
                  <button
                    onClick={() => handleEdit(serviceType)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(serviceType.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTypeManager;
