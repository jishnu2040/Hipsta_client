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
        <p className="text-sm text-green-600">Bookins: {payload[0].value}</p>
        <p className="text-sm text-red-600">Cancel: {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

const Chart = () => {
  const [chartData, setChartData] = useState([]);
  const partnerId = localStorage.getItem("partnerId"); // Fetch partnerId from local storage

  useEffect(() => {
    if (partnerId) {
      // Fetch the appointment analysis data
      axios
        .get(`http://localhost:8000/api/v1/booking/analysis/${partnerId}/`)
        .then((response) => {
          const appointments = response.data.appointments;
          // Process data for the chart: group by date and count 'booked' and 'canceled' statuses
          const groupedData = appointments.reduce((acc, appointment) => {
            const date = new Date(appointment.date).toLocaleDateString('en-GB', { weekday: 'short' }); // Get weekday name
            if (!acc[date]) {
              acc[date] = { booked: 0, canceled: 0 };
            }
            if (appointment.status === 'booked') {
              acc[date].booked += 1;
            } else if (appointment.status === 'canceled') {
              acc[date].canceled += 1;
            }
            return acc;
          }, {});

          // Transform the grouped data into an array suitable for recharts
          const chartFormattedData = Object.keys(groupedData).map((day) => ({
            name: day,
            booked: groupedData[day].booked,
            canceled: groupedData[day].canceled,
            amt: 400, // You can remove this if it's not needed for your chart
          }));

          setChartData(chartFormattedData);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
        });
    } else {
      console.error("Partner ID not found in local storage");
    }
  }, [partnerId]);

  return (
    <div className="rounded-lg">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
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
          <XAxis
            dataKey="name"
            tick={{ fontSize: 15, fill: '#555' }}
            axisLine={{ stroke: '#ddd' }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="top" height={36} />
          <Line
              type="monotone"
              dataKey="booked"
              stroke="#28a745"  // Green for booked appointments
              strokeWidth={4}
              fill="url(#colorBooked)"
              dot={{ fill: '#28a745', r: 5 }}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="canceled"
              stroke="#dc3545"  // Red for canceled appointments
              strokeWidth={4}
              fill="url(#colorCanceled)"
              dot={{ fill: '#dc3545', r: 5 }}
              activeDot={{ r: 8 }}
            />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
