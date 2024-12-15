import React from 'react';
import Card from './DashBoard/Card';
import { FaCalendarCheck, FaDollarSign, FaUsers } from 'react-icons/fa';

const Dashboard = () => {
  // Example data for left section cards
  const leftCards = [
    { title: 'Total Bookings', value: 1200, icon: <FaCalendarCheck /> },
    { title: 'Revenue', value: '$25,000', icon: <FaDollarSign /> },
    { title: 'Partners', value: 150, icon: <FaUsers /> },
  ];

  // Example data for right section cards
  const rightCards = [
    { title: 'Active Users', value: 450, icon: <FaUsers /> },
  ];

  return (
    <div className="grid grid-cols-12 gap-6 p-8">
      {/* Left Section (8/12) */}
      <div className="col-span-12 md:col-span-8 space-y-6">
        {/* Top Three Square Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {leftCards.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              value={item.value}
              icon={item.icon}
              className="w-32 h-48" // Ensures square shape
            />
          ))}
        </div>

        {/* Cart Section Below */}
        <div className="p-6 bg-gray-200 rounded-lg shadow-md h-80">
          <h2 className="text-xl font-semibold">Cart</h2>
          {/* Replace with actual cart content */}
          <p className="text-gray-500">Your cart details go here...</p>
        </div>
      </div>

      {/* Right Section (4/12) */}
      <div className="col-span-12 md:col-span-4 space-y-6">
        {/* Two Equal-Width Cards */}
        <div className="grid grid-cols-1 gap-6 ">
          {rightCards.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              value={item.value}
              icon={item.icon}
              className="h-56 bg-yellow-600" 
            />
          ))}
        </div>

        {/* Bottom Larger Card */}
        <div className="p-6 bg-blue-100 rounded-lg shadow-md h-96">
          <h2 className="text-xl font-semibold">Detailed Report</h2>
          {/* Replace with actual detailed report content */}
          <p className="text-gray-500">Detailed insights and metrics go here...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
