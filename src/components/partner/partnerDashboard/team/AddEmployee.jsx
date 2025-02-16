import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = ({ closeDrawer }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [serviceType, setServiceType] = useState(''); // New state for service type
  const [isAvailable, setIsAvailable] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [specializations, setSpecializations] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]); // State for service types
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch specializations and service types to populate dropdowns
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [specializationsResponse, serviceTypesResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}partner/specializations`),
          axios.get(`${API_BASE_URL}core/service_type/`),
        ]);
        setSpecializations(specializationsResponse.data);
        setServiceTypes(serviceTypesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch dropdown data.');
      }
    };

    fetchData();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(''); // Clear previous errors

    const partnerId = localStorage.getItem('partnerId');
    if (!partnerId) {
      setError('Partner ID is missing. Please log in first.');
      setLoading(false);
      return;
    }

    // Basic phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid phone number.');
      setLoading(false);
      return;
    }

    try {
      const newEmployee = {
        name,
        phone,
        specialization, // Send specialization ID directly
        service_type: serviceType, // Include service type ID
        is_available: isAvailable,
        is_active: isActive,
        partner: partnerId,
      };

      await axios.post(
        `${API_BASE_URL}partner/employees/${partnerId}/`,
        newEmployee
      );

      setLoading(false);
      closeDrawer(); // Close the drawer on successful submission
    } catch (error) {
      setLoading(false);
      console.error('Error creating employee:', error);
      setError('Failed to create employee. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">Add New Employee</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2" htmlFor="specialization">
            Specialization
          </label>
          <select
            id="specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Specialization</option>
            {specializations.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold text-gray-700 mb-2" htmlFor="serviceType">
            Service Type
          </label>
          <select
            id="serviceType"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Service Type</option>
            {serviceTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAvailable"
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
              className="h-5 w-5"
            />
            <label htmlFor="isAvailable" className="ml-2 text-gray-700">
              Available
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
              className="h-5 w-5"
            />
            <label htmlFor="isActive" className="ml-2 text-gray-700">
              Active
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
