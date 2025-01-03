// src/components/PartnerDashboard/Chart.js

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', appointment: 4, booking: 2, amt: 400 },
  { name: 'Tue', appointment: 3, booking: 1, amt: 250 },
  { name: 'Wed', appointment: 2, booking: 9, amt: 229 },
  { name: 'Thu', appointment: 2, booking: 3, amt: 200 },
  { name: 'Fri', appointment: 1, booking: 4, amt: 218 },
  { name: 'Sat', appointment: 2, booking: 3, amt: 250 },
  { name: 'Sun', appointment: 3, booking: 4, amt: 210 },
];

const Chart = () => {
  return (
    <div className=" p-4 bg-white ">
      <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="appointment" stroke="#8884d8" />
          <Line type="monotone" dataKey="booking" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
