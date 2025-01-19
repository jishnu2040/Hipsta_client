import React, { useEffect, useState } from 'react';
import axios from 'axios';
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


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
        <h4 className="font-semibold text-gray-700">{label}</h4>
        <p className="text-sm text-green-600">Bookings: {payload[0]?.value}</p>
        <p className="text-sm text-red-600">Cancellations: {payload[1]?.value}</p>
      </div>
    );
  }
  return null;
};

const Chart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch the grouped booking data
    axios
      .get(`http://localhost:8000/api/v1/admin/bookings/`)
      .then((response) => {
        const groupedBookings = response.data; // Array of months with bookings

        // Process the response to calculate booked and canceled counts
        const chartFormattedData = groupedBookings.map(({ month, bookings }) => {
          const counts = bookings.reduce(
            (acc, { status }) => {
              if (status === 'booked') acc.booked += 1;
              else if (status === 'canceled') acc.canceled += 1;
              return acc;
            },
            { booked: 0, canceled: 0 }
          );

          return {
            name: new Date(`${month}-01`).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }), // Format 'MMM YYYY'
            booked: counts.booked,
            canceled: counts.canceled,
          };
        });

        setChartData(chartFormattedData);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      });
  }, []);

  return (
    <div className="rounded-lg">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 15, fill: '#555' }}
            axisLine={{ stroke: '#ddd' }}
            tickLine={false}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="booked"
            stroke="#28a745" 
            strokeWidth={4}
            dot={{ fill: '#28a745', r: 5 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="canceled"
            stroke="#dc3545" 
            strokeWidth={4}
            dot={{ fill: '#dc3545', r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
