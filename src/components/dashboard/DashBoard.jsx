// src/components/dashboard/Dashboard.jsx
import React from 'react';
import RecentSalesChart from './ReactSalesChart';
import UpcomingAppointments from './UpcomingAppointments';
import TodayNextAppointments from './TodayNextAppointments';
import TopServices from './TopServices';
import TopTeamMembers from './TopTeamMembers';

function Dashboard() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <RecentSalesChart />
      <UpcomingAppointments />
      <TodayNextAppointments />
      <TopServices />
      <TopTeamMembers />
    </div>
  );
}

export default Dashboard;
