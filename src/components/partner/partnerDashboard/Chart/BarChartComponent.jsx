import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', booking: 3, checkin: 2 },
  { name: 'Tue', booking: 4, checkin: 2 },
  { name: 'Wed', booking: 5, checkin: 3 },
  { name: 'Thu', booking: 3, checkin: 1 },
  { name: 'Fri', booking: 6, checkin: 6 },
];

const BarChartComponent = () => (
  <div className="p-4 bg-white ">
    <h3 className="text-lg font-semibold mb-4">Booking's and Checkedin</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="booking" fill="#8884d8" />
        <Bar dataKey="checkin" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default BarChartComponent;
