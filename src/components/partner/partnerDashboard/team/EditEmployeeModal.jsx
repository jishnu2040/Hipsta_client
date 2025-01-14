import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../utlils/axiosinstance';

const EditEmployeeModal = ({ employee, closeModal, refreshEmployees }) => {
  const [name, setName] = useState(employee.name || '');
  const [phone, setPhone] = useState(employee.phone || '');
  const [specialization, setSpecialization] = useState(employee.specialization?.id || '');
  const [isAvailable, setIsAvailable] = useState(employee.is_available);
  const [isActive, setIsActive] = useState(employee.is_active);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch specializations to populate the dropdown
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:8000/api/v1/partner/specializations');
        setSpecializations(response.data);
      } catch (error) {
        console.error('Error fetching specializations:', error);
        setError('Failed to fetch specializations.');
      }
    };

    fetchSpecializations();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const partnerId = localStorage.getItem('partnerId');
    if (!partnerId) {
      setError('Partner ID is missing.');
      setLoading(false);
      return;
    }

    try {
      const updatedEmployee = {
        name,
        phone,
        specialization,
        is_available: isAvailable,
        is_active: isActive,
      };

      await axiosInstance.patch(
      `http://localhost:8000/api/v1/partner/employees/${partnerId}/`,
      updatedEmployee,
      { headers: { "Content-Type": "application/json" } }
    );

      setLoading(false);
      closeModal();
      refreshEmployees();
    } catch (error) {
      setLoading(false);
      setError('Failed to update employee.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>

      {/* Modal Content */}
      <div className="relative w-full sm:w-1/3 bg-white shadow-lg p-6">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700" htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-gray-700" htmlFor="specialization">Specialization</label>
            <select
              id="specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              {specializations.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.name}
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
              <label htmlFor="isAvailable" className="ml-2 text-gray-700">Available</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
                className="h-5 w-5"
              />
              <label htmlFor="isActive" className="ml-2 text-gray-700">Active</label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Employee'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
