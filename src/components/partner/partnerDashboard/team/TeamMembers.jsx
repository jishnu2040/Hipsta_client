import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AddEmployee from './AddEmployee';
import EditEmployeeModal from './EditEmployeeModal';
import ThemeContext from '../../../../ThemeContext';

const TeamMembers = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const partnerId = localStorage.getItem('partnerId');

    if (partnerId) {
      const fetchEmployees = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/v1/partner/employees/${partnerId}/`);
          setEmployees(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching employees:', error);
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
  if (error) return <p className={`text-${isDarkMode ? 'gray-200' : 'red-500'}`}>{error}</p>;

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  return (
    <div className={`container mx-auto p-8 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl sm:text-4xl font-bold">Professionals</h2>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className={`px-6 py-3 text-sm font-semibold rounded-md ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-700 hover:bg-gray-800 text-white'
          }`}
        >
          + Add Member
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <button
              key={employee.id}
              onClick={() => handleEditClick(employee)}
              className="col-span-1"
            >
              <div
                className={`p-8 rounded-xl border flex items-center ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{employee.name}</h3>
                  <p className="text-md">{employee.specialization?.name}</p>
                  <p className="text-sm">Phone: {employee.phone}</p>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <span
                      className={`font-semibold text-xs ${
                        employee.is_available ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {employee.is_available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={`/employeeAvailability?employeeId=${employee.id}`}
                    className={`inline-flex items-center px-2 py-2 text-3xl ${
                      isDarkMode ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    📅
                  </a>
                </div>
              </div>
            </button>
          ))
        ) : (
          <p>No employees found for this partner.</p>
        )}
      </div>

      {/* Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsDrawerOpen(false)}
          ></div>
          <div
            className={`relative w-full sm:w-1/3 shadow-lg p-6 ${
              isDarkMode ? 'bg-white text-black' : 'bg-white text-gray-900'
            }`}
          >
            <button
              onClick={() => setIsDrawerOpen(false)}
              className={`absolute top-4 right-4 ${
                isDarkMode ? 'text-gray-400 hover:text-gray-100' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              ✖
            </button>
            <AddEmployee closeDrawer={() => setIsDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {isEditModalOpen && (
        <EditEmployeeModal
          employee={selectedEmployee}
          closeModal={() => setIsEditModalOpen(false)}
          refreshEmployees={() => setEmployees((prev) => [...prev])}
        />
      )}
    </div>
  );
};

export default TeamMembers;
