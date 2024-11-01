import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Catalog() {
  const [services, setServices] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [userId, setUserId] = useState(''); // Manage user ID locally

  useEffect(() => {
    // Retrieve user ID and access token from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const accessToken = localStorage.getItem('access_token');
    if (user && accessToken) {
      setUserId(user.userId);

      // Fetch partner services
      axios.get(`http://127.0.0.1:8000/api/v1/partner/${user.userId}/services/`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
        .then(response => {
          setServices(response.data.service_type);
        })
        .catch(error => {
          console.error('There was an error fetching the services!', error);
        });

      // Fetch all service types
      axios.get('http://127.0.0.1:8000/api/v1/partner/service-types/', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      })
        .then(response => {
          setServiceTypes(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the service types!', error);
        });
    }
  }, []);

  const handleAddService = () => {
    if (selectedService) {
      const accessToken = localStorage.getItem('access_token');
      axios.patch(`http://127.0.0.1:8000/api/v1/partner/${userId}/services/add/`, 
        { service_type: [selectedService] }, 
        { headers: { 'Authorization': `Bearer ${accessToken}` } }
      )
      .then(response => {
        setServices(response.data.service_type);
        setSelectedService('');
      })
      .catch(error => {
        console.error('There was an error adding the service!', error);
      });
    }
  };

  const handleDeleteService = (serviceId) => {
    const accessToken = localStorage.getItem('access_token');
    axios.delete(`http://127.0.0.1:8000/api/v1/partner/${userId}/services/add/`, 
      { 
        data: { service_type: serviceId },
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
    )
    .then(response => {
      setServices(response.data.service_type);
    })
    .catch(error => {
      console.error('There was an error deleting the service!', error);
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Service Catalog</h2>
      <ul className="mb-4">
        {services.map(service => (
          <li key={service.id} className="mb-2 flex justify-between items-center">
            {service.name}
            <button
              onClick={() => handleDeleteService(service.id)}
              className="ml-2 px-2 py-1 bg-red-500 text-white rounded-lg"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="flex mb-4">
        <select
          value={selectedService}
          onChange={e => setSelectedService(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select a Service</option>
          {serviceTypes.map(service => (
            <option key={service.id} value={service.id}>{service.name}</option>
          ))}
        </select>
        <button
          onClick={handleAddService}
          className="ml-2 px-4 py-2 bg-indigo-500 text-white rounded-lg"
        >
          Add Service
        </button>
      </div>
    </div>
  );
}

export default Catalog;
