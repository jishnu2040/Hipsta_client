import React, { useEffect, useState } from 'react';
import { Scheduler } from 'devextreme-react/scheduler';
import axios from 'axios';

const SchedulerComponent = () => {
  const [appointments, setAppointments] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const partnerId = localStorage.getItem('partnerId'); // Retrieve partnerId from localStorage

    if (partnerId) {
      // Fetch appointments for the specific partner
      axios.get(`http://localhost:8000/api/v1/booking/${partnerId}/`)
        .then((response) => {
          // Map appointments to match the scheduler's data format
          const transformedAppointments = response.data.appointments.map(appointment => ({
            id: appointment.id,
            startDate: `2024-12-15T${appointment.start_time}`, // Assuming a specific date, update accordingly
            endDate: `2024-12-15T${appointment.end_time}`,
            text: `Service: ${appointment.service}`, // Display service name or any other identifier
            employeeId: appointment.employee, // This should link to employee resource
          }));

          setAppointments(transformedAppointments);

          // Assuming employees are provided or fetched elsewhere, map them as needed
          const employeeData = response.data.employees.map(employee => ({
            id: employee.id,
            text: employee.name || 'Unknown Employee', // Adjust if needed
            avatar: employee.avatar || '', // If avatars are available
          }));

          setEmployees(employeeData);
        })
        .catch((error) => {
          console.error('Error fetching appointments:', error);
        });
    } else {
      console.error('Partner ID not found in localStorage');
    }
  }, []);

  return (
    <div className="p-4">
      <Scheduler
        dataSource={appointments}
        defaultCurrentView="day"
        defaultCurrentDate={new Date(2024, 11, 15)}
        height={600}
        startDayHour={8}
        endDayHour={22}
        cellDuration={30}
        showAllDayPanel={false}
        resources={[{
          fieldExpr: 'employeeId',
          allowMultiple: false,
          dataSource: employees,
          label: 'Employee',
          valueExpr: 'id',
          displayExpr: 'text',
        }]}
        groups={['employeeId']}
        itemTemplate={(itemData) => {
          const employee = employees.find(e => e.id === itemData.employeeId);
          return (
            <div className="flex items-center space-x-2">
              <img src={employee.avatar} alt={employee.text} className="w-8 h-8 rounded-full" />
              <span>{employee.text}</span>
            </div>
          );
        }}
      />
    </div>
  );
};

export default SchedulerComponent;
