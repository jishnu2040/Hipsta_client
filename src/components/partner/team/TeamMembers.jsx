import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddEmployee from './AddEmployee';
import EditEmployeeModal from './EditEmployeeModal';

const TeamMembers = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for Edit Employee Modal
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State for the selected employee for editing

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

  if (loading) return <div className="loader">...</div>;
  if (error) return <p>{error}</p>;

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Professionals</h2>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="px-6 py-3 text-sm font-semibold text-white bg-gray-700 hover:bg-gray-800 rounded-md"
        >
          + Add Member
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
        {employees.length > 0 ? (
          employees.map((employee) => (
            <button key={employee.id} onClick={() => handleEditClick(employee)} className="col-span-1">
              <div className="p-8 bg-white rounded-xl  border border-gray-200 flex items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{employee.name}</h3>
                  <p className="text-md text-gray-600">{employee.specialization?.name}</p>
                  <p className="text-sm text-gray-600">Phone: {employee.phone}</p>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <span
                      className={` font-semibold text-xs ${
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
                    className="inline-flex items-center px-2 py-2 text-3xl text-white"
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
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsDrawerOpen(false)}
          ></div>

          {/* Drawer Content */}
          <div className="relative w-1/3 bg-white shadow-lg p-6">
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
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
