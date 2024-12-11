import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; // Import the avatar icon

const Professional = ({ setBookingData, bookingData, partnerId }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = 'http://localhost:8000/api/v1';

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/customer/${partnerId}/employees/`);
        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
        setError('Failed to fetch employees. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (partnerId) {
      fetchEmployees();
    }
  }, [partnerId]);

  const handleSelectEmployee = (employee) => {
    setBookingData({
      ...bookingData,
      employee,
    });
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading professionals...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose a Professional</h2>
      {employees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => handleSelectEmployee(employee)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 flex items-center space-x-4 ${
                bookingData.employee?.id === employee.id ? 'bg-indigo-300 border-indigo-900' : 'bg-white border-gray-300'
              }`}
            >
              {employee.avatar_url ? (
                <img
                  src={employee.avatar_url}
                  alt={employee.name}
                  className="w-16 h-16 rounded-full object-cover border border-gray-200"
                />
              ) : (
                <FaUserCircle className="w-16 h-16 text-gray-400" /> // Avatar icon for missing avatar
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-700">{employee.name}</h3>
                {employee.is_available ? (
                  <span className="text-sm text-green-500 font-medium">Available</span>
                ) : (
                  <span className="text-sm text-red-500 font-medium">Unavailable</span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No employees available for this partner.</p>
      )}
    </div>
  );
};

export default Professional;
