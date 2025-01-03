import React, { useEffect, useState } from 'react';
import { Scheduler } from 'devextreme-react/scheduler';
import axios from 'axios';

const SchedulerComponent = () => {
  const [appointments, setAppointments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isTableView, setIsTableView] = useState(false); // State to toggle between table and calendar view
  const [defaultDate, setDefaultDate] = useState(new Date()); // Default date state

  useEffect(() => {
    const partnerId = localStorage.getItem('partnerId'); // Retrieve partnerId from localStorage

    if (partnerId) {
      // Fetch appointments for the specific partner
      axios
        .get(`http://localhost:8000/api/v1/booking/${partnerId}/`)
        .then((response) => {
          // Transform appointments
          const transformedAppointments = response.data.appointments.map((appointment) => {
            return {
              id: appointment.id,
              startDate: `${appointment.date}T${appointment.start_time}`, // Use appointment's actual start time
              endDate: `${appointment.date}T${appointment.end_time}`, // Use appointment's actual end time
              text: `${appointment.service_name} - ${appointment.customer_name} -() ${appointment.employee_name}`, 
              customerName: appointment.customer_name,
              employeeName: appointment.employee_name,
              serviceName: appointment.service_name,
              date: appointment.date, // Store date for filtering
            };
          });

          // Set default date based on the first appointment's date if available
          if (transformedAppointments.length > 0) {
            setDefaultDate(new Date(transformedAppointments[0].date));
          }

          setAppointments(transformedAppointments);

          // Transform employees (if available in response)
          const employeeData = response.data.employees.map((employee) => ({
            id: employee.id,
            text: employee.name || 'Unknown Employee',
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
                <th className="px-4 py-2 border-b">Customer Name</th>
                <th className="px-4 py-2 border-b">Employee Name</th>
                <th className="px-4 py-2 border-b">Service</th>
                <th className="px-4 py-2 border-b">Start Time</th>
                <th className="px-4 py-2 border-b">End Time</th>
                <th className="px-4 py-2 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="px-4 py-2 border-b">{appointment.customerName}</td>
                  <td className="px-4 py-2 border-b">{appointment.employeeName}</td>
                  <td className="px-4 py-2 border-b">{appointment.serviceName}</td>
                  <td className="px-4 py-2 border-b">{appointment.startDate}</td>
                  <td className="px-4 py-2 border-b">{appointment.endDate}</td>
                  <td className="px-4 py-2 border-b">{appointment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Calendar View (Scheduler)
        <div>
          {/* Employee Names at the top */}
          <div className="flex space-x-4 mb-4">
            {employees.map((employee) => (
              <div key={employee.id} className="p-2 bg-gray-200 rounded-full">
                <span className='bg-red-600'>{employee.text}</span>
              </div>
            ))}
          </div>

          {/* Scheduler Component */}
          <Scheduler
            dataSource={appointments}
            defaultCurrentView="day"
            defaultCurrentDate={defaultDate} // Dynamically set the default current date
            height={600}
            startDayHour={8}
            endDayHour={22}
            cellDuration={30}
            showAllDayPanel={false}
            resources={[
              {
                fieldExpr: 'employeeName', // Group by employeeName
                allowMultiple: false,
                dataSource: employees,
                label: 'Employee',
                valueExpr: 'text',
                displayExpr: 'text',
              },
            ]}
            groups={['employeeName']} // Group by employee to split the calendar vertically
            itemTemplate={(itemData) => (
              <div className="flex items-center space-x-2">
                <img
                  src={itemData.avatar}
                  alt={itemData.employeeName}
                  className="w-8 h-8 rounded-full"
                />
                <span>{itemData.employeeName}</span>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default SchedulerComponent;
