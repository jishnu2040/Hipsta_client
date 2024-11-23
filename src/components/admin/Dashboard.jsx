// Dashboard.js
import React from 'react';
import Card from './DashBoard/Card';
import { FaCalendarCheck, FaDollarSign, FaUsers } from 'react-icons/fa'; // Example icons from react-icons

const Dashboard = () => {
  // Example data, you can replace this with your real data
  const data = [
    {
      title: 'Total Bookings',
      value: 1200, // Replace with actual bookings count
      icon: <FaCalendarCheck />,
    },
    {
      title: 'Revenue',
      value: '$25,000', // Replace with actual revenue
      icon: <FaDollarSign />,
    },
    {
      title: 'Partners',
      value: 150, // Replace with actual partner count
      icon: <FaUsers />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {data.map((item, index) => (
        <Card key={index} title={item.title} value={item.value} icon={item.icon} />
      ))}
    </div>
  );
};

export default Dashboard;
