import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const RealTimeChart = () => {
  const [data, setData] = useState([
    { time: '10:00', value: 200 },
    { time: '10:05', value: 400 },
    { time: '10:10', value: 300 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 500) + 100;
      const time = new Date().toLocaleTimeString();
      setData((prev) => [...prev.slice(-9), { time, value: newValue }]);
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Real-Time Data</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RealTimeChart;
