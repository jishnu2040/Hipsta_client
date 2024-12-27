import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TeamMembers = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get the partnerId from local storage
    const partnerId = localStorage.getItem('partnerId'); // Adjust the key as needed

    if (partnerId) {
      // Fetch employees for the partner based on partnerId
      const fetchEmployees = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/v1/partner/${partnerId}/employees/list/`);
          setEmployees(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching employees:", error);
          setError(error?.response?.data?.detail || 'Failed to fetch employees.');
          setLoading(false);
        }
      };

      fetchEmployees();
    } else {
      setError('Partner ID is missing in local storage.');
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Employees List</h2>
        {/* Add New Service Button */}
        <Link
          to="/partner/team/new-member" 
          className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-gray-900 to-indigo-600 rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg transition-all transform hover:scale-105"
        >
          + Add New Service
        </Link>
      </div>
      <div className="space-y-6">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div class="p-6 bg-white rounded-lg shadow-md border border-gray-200 flex items-center">
  <div class="flex-1">
    <h3 class="text-lg font-semibold text-gray-800">
      {employee.name}
    </h3>
    <p class="text-md text-gray-600">{employee.specialization?.name}</p>
    <p class="text-sm text-gray-600">Phone: {employee.phone}</p>
    <div class="flex space-x-2 mt-2">
      <span class={`text-xs font-semibold ${employee.is_available ? 'text-green-500' : 'text-red-500'}`}>
        {employee.is_available ? 'Available' : 'Not Available'}
      </span>
    </div>
  </div>
  <a 
    href={`/employeeAvailability?employeeId=${employee.id}`} 
    class="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
  >
    Schedule
  </a>
</div>
          ))
        ) : (
          <p>No employees found for this partner.</p>
        )}
      </div>
    </div>
  );
};

export default TeamMembers;
