import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const BarChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const partnerId = localStorage.getItem("partnerId");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (partnerId) {
      axios
        .get(`${API_BASE_URL}booking/analysis/${partnerId}/`)
        .then((response) => {
          const appointments = response.data.appointments;
          const groupedData = appointments.reduce((acc, appointment) => {
            const date = new Date(appointment.date).toLocaleDateString('en-GB', { weekday: 'short' });
            if (!acc[date]) {
              acc[date] = { booked: 0, completed: 0 };
            }
            if (appointment.status === 'booked') {
              acc[date].booked += 1;
            } else if (appointment.status === 'completed') {
              acc[date].completed += 1;
            }
            return acc;
          }, {});

          const chartFormattedData = Object.keys(groupedData).map((day) => ({
            name: day,
            booked: groupedData[day].booked,
            completed: groupedData[day].completed,
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
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="booked" fill="#BFEFFF" /> 
          <Bar dataKey="completed" fill="#D8BFD8" /> 
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
