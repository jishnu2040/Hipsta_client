import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch partnerId from localStorage
  const partnerId = localStorage.getItem('partnerId');

  useEffect(() => {
    if (partnerId) {
      // Fetch the top employees for the given partner ID
      axios
        .get(`http://localhost:8000/api/v1/partner/${partnerId}/topEmployee/`)
        .then((response) => {
          setEmployees(response.data); // Set the fetched employee data
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching top employees:', error);
          setLoading(false);
        });
    } else {
      console.error('Partner ID not found in localStorage');
      setLoading(false);
    }
  }, [partnerId]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-800 ">Top Employees</h3>
      <ul>
        {employees.length === 0 ? (
          <li>No employees found.</li>
        ) : (
          employees.map((employee) => (
            <li
              key={employee.id}
              className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center text-xl font-semibold text-white">
                  {employee.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{employee.name}</p>
                  <p className="text-sm text-gray-600">Total Appointments</p>
                </div>
              </div>
              <span className="text-xl font-semibold text-gray-700">
                {employee.total_appointments}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TopEmployees;
