import React, { useEffect, useState } from 'react';
import { Scheduler } from 'devextreme-react/scheduler';
import axios from 'axios';

const SchedulerComponent = () => {
  const [appointments, setAppointments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isTableView, setIsTableView] = useState(false); // State to toggle between table and calendar view

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
      <div className="mb-6">
        {/* Toggle Button */}
        <button
          className="mb-4 p-2 bg-blue-500 text-white rounded"
          onClick={() => setIsTableView(!isTableView)}
        >
          {isTableView ? 'Switch to Calendar View' : 'Switch to Table View'}
        </button>
      </div>

      {/* Conditional Rendering for Calendar or Table */}
      {isTableView ? (
        // Table View
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Appointment ID</th>
                <th className="px-4 py-2 border-b">Service</th>
                {/* <th className="px-4 py-2 border-b">Employee</th> */}
                <th className="px-4 py-2 border-b">Start Time</th>
                <th className="px-4 py-2 border-b">End Time</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => {
                const employee = employees.find(e => e.id === appointment.employeeId);
                return (
                  <tr key={appointment.id}>
                    <td className="px-4 py-2 border-b">{appointment.id}</td>
                    <td className="px-4 py-2 border-b">{appointment.text}</td>
                    {/* <td className="px-4 py-2 border-b">{employee ? employee.text : 'Unknown'}</td> */}
                    <td className="px-4 py-2 border-b">{appointment.startDate}</td>
                    <td className="px-4 py-2 border-b">{appointment.endDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        // Calendar View (Scheduler)
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
      )}
    </div>
  );
};

export default SchedulerComponent;
