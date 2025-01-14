import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
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
  <div className="">
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="booking" fill="#BFEFFF" />
        <Bar dataKey="checkin" fill="#D8BFD8" /> 


      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default BarChartComponent;
