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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
        <h4 className="font-semibold text-gray-700">{label}</h4>
        <p className="text-sm text-blue-600">Appointments: {payload[0].value}</p>
        <p className="text-sm text-green-600">Bookings: {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

const Chart = () => {
  return (
    <div className="rounded-lg">

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          {/* Add a gradient for better visuals */}
          <defs>
            <linearGradient id="colorAppointment" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBooking" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          {/* <CartesianGrid strokeDasharray="3 3" stroke="#ddd" /> */}
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: '#555' }}
            axisLine={{ stroke: '#ddd' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#555' }}
            axisLine={{ stroke: '#ddd' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="appointment"
            stroke="#8884d8"
            strokeWidth={4}
            fill="url(#colorAppointment)"
            dot={{ fill: '#8884d8', r: 5 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="booking"
            stroke="#82ca9d"
            strokeWidth={4}
            fill="url(#colorBooking)"
            dot={{ fill: '#82ca9d', r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
