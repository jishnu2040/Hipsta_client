import React, { useContext } from 'react';
import ThemeContext from '../../../ThemeContext';

const Dashboard = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`p-6 min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'
      }`}
    >
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Graph Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div
          className={`p-4 shadow rounded-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-semibold mb-2">Sales Graph</h2>
          <div
            className={`h-48 flex items-center justify-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          >
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              [Graph Placeholder]
            </span>
          </div>
        </div>
        <div
          className={`p-4 shadow rounded-lg ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h2 className="text-xl font-semibold mb-2">Appointments Graph</h2>
          <div
            className={`h-48 flex items-center justify-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          >
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
              [Graph Placeholder]
            </span>
          </div>
        </div>
      </div>

      {/* Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Recent Sales Card */}
        <div
          className={`p-6 shadow-lg rounded-lg border-l-4 ${
            isDarkMode ? 'bg-gray-800 border-blue-600' : 'bg-white border-blue-500'
          }`}
        >
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Recent Sales
          </h2>
          <ul className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            <li>Order #1234 - $150 - Haircut - John Doe</li>
            <li>Order #1235 - $200 - Spa - Jane Smith</li>
            <li>Order #1236 - $120 - Massage - Emily Johnson</li>
          </ul>
        </div>

        {/* Upcoming Appointments Card */}
        <div
          className={`p-6 shadow-lg rounded-lg border-l-4 ${
            isDarkMode ? 'bg-gray-800 border-green-600' : 'bg-white border-green-500'
          }`}
        >
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
            Upcoming Appointments
          </h2>
          <ul className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            <li>16th Nov, 2024 - 10:00 AM - Haircut - Alex</li>
            <li>16th Nov, 2024 - 12:30 PM - Massage - Sam</li>
            <li>17th Nov, 2024 - 02:00 PM - Spa - Maya</li>
          </ul>
        </div>

        {/* Appointments Activity Card */}
        <div
          className={`p-6 shadow-lg rounded-lg border-l-4 ${
            isDarkMode ? 'bg-gray-800 border-yellow-600' : 'bg-white border-yellow-500'
          }`}
        >
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
            Appointments Activity
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            5 New Appointments Today
          </p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            2 Canceled Appointments
          </p>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            3 Completed Appointments
          </p>
        </div>

        {/* Today's Next Appointments Card */}
        <div
          className={`p-6 shadow-lg rounded-lg border-l-4 ${
            isDarkMode ? 'bg-gray-800 border-purple-600' : 'bg-white border-purple-500'
          }`}
        >
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            Today's Next Appointments
          </h2>
          <ul className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            <li>11:00 AM - Haircut - Michael</li>
            <li>01:00 PM - Facial - Sarah</li>
          </ul>
        </div>

        {/* Top Team Member Card */}
        <div
          className={`p-6 shadow-lg rounded-lg border-l-4 ${
            isDarkMode ? 'bg-gray-800 border-indigo-600' : 'bg-white border-indigo-500'
          }`}
        >
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            Top Team Member
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            Jane Doe - 20 Appointments This Month
          </p>
        </div>

        {/* Top Service Card */}
        <div
          className={`p-6 shadow-lg rounded-lg border-l-4 ${
            isDarkMode ? 'bg-gray-800 border-pink-600' : 'bg-white border-pink-500'
          }`}
        >
          <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
            Top Service
          </h2>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            Hair Coloring - 50 Bookings This Month
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
