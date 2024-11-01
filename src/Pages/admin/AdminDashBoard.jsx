import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import { FaChartLine, FaUsers, FaCog, FaBox } from 'react-icons/fa';

function AdminDashBoard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens and redirect to login page
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/admin-login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header onLogout={handleLogout} />
        <main className="h-full overflow-y-auto p-8">
          <div className="container mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Cards for various dashboard sections */}
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <FaChartLine className="text-indigo-600 text-3xl" />
                  <span className="text-3xl font-bold text-gray-700">Reports</span>
                </div>
                <p className="text-gray-500">View and manage system reports and analytics.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <FaUsers className="text-green-600 text-3xl" />
                  <span className="text-3xl font-bold text-gray-700">Users</span>
                </div>
                <p className="text-gray-500">Manage users, their roles, and permissions.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <FaBox className="text-blue-600 text-3xl" />
                  <span className="text-3xl font-bold text-gray-700">Inventory</span>
                </div>
                <p className="text-gray-500">Track and manage inventory items and categories.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <FaCog className="text-gray-600 text-3xl" />
                  <span className="text-3xl font-bold text-gray-700">Settings</span>
                </div>
                <p className="text-gray-500">Configure system settings and preferences.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashBoard;
