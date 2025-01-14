// src/components/PartnerDashboard/TopEmployees.js
import React from 'react';

const TopEmployees = () => {
  const employees = [
    { id: 1, name: 'John Doe', role: 'Manager', score: 92 },
    { id: 2, name: 'Jane Smith', role: 'Developer', score: 88 },
    { id: 3, name: 'Mike Johnson', role: 'Designer', score: 85 },
    { id: 4, name: 'Sara Lee', role: 'Marketer', score: 81 },
  ];

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Top Employees</h3>
      <ul>
        {employees.map((employee) => (
          <li
            key={employee.id}
            className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-blue-200 rounded-full flex items-center justify-center text-xl font-semibold text-white">
                {employee.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-800">{employee.name}</p>
                <p className="text-sm text-gray-600">{employee.role}</p>
              </div>
            </div>
            <span className="text-xl font-semibold text-gray-700">{employee.score}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopEmployees;
