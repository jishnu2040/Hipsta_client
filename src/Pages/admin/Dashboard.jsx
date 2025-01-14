import React, { useEffect, useState } from 'react';
import Card from '../../components/admin/DashBoard/Card';
import { FaCalendarCheck, FaUsers } from 'react-icons/fa';
import axios from 'axios'; // Ensure you install axios: npm install axios

const Dashboard = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [partners, setPartners] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total bookings
        const bookingsResponse = await axios.get('http://localhost:8000/api/v1/booking/total-bookings/');
        const totalBookingsData = bookingsResponse.data.total_bookings;

        // Fetch partner count
        const partnersResponse = await axios.get('http://localhost:8000/api/v1/partner/partner-count/');
        const partnerCountData = partnersResponse.data.partner_count;

        // Fetch active user count
        const usersResponse = await axios.get('http://localhost:8000/api/v1/auth/user-count/');
        const userCountData = usersResponse.data.user_count;

        // Update state variables with backend data
        setTotalBookings(totalBookingsData);
        setPartners(partnerCountData);
        setActiveUsers(userCountData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  // Dynamic card data
  const leftCards = [
    { title: 'Total Bookings', value: totalBookings, icon: <FaCalendarCheck /> },
    { title: 'Partners', value: partners, icon: <FaUsers /> },
  ];

  const rightCards = [
    { title: 'Active Users', value: activeUsers, icon: <FaUsers /> },
  ];

  return (
    <div className="grid grid-cols-12 gap-6 p-8">
      {/* Left Section (8/12) */}
      <div className="col-span-12 md:col-span-8 space-y-6">
        {/* Top Three Square Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        <div className="grid grid-cols-1 gap-6">
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
