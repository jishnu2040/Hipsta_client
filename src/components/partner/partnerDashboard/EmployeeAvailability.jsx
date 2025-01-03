import React, { useState, useEffect } from 'react';
import { fetchAvailability, createAvailability, deleteAvailability } from '../../../Services/employeeAvailabilityService';
import { Scheduler } from 'devextreme-react/scheduler';
import axios from 'axios';

const EmployeeAvailability = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [viewMode, setViewMode] = useState('calendar');
  const [partnerId, setPartnerId] = useState(null);

  // Fetch employees
  useEffect(() => {
    const storedPartnerId = localStorage.getItem('partnerId');
    setPartnerId(storedPartnerId);

    if (storedPartnerId) {
      const fetchEmployees = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/v1/partner/employees/${storedPartnerId}/`);
          setEmployees(response.data);
          if (response.data.length > 0) {
            setEmployeeId(response.data[0].id);
          }
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      };

      fetchEmployees();
    }
  }, []);

  // Fetch availability for the selected employee
  useEffect(() => {
    if (employeeId) {
      const getAvailability = async () => {
        setLoading(true);
        try {
          const response = await fetchAvailability(employeeId);
          const formattedAppointments = response.data.map(slot => ({
            text: 'Available',
            startDate: new Date(`${slot.date}T${slot.start_time}`),
            endDate: new Date(`${slot.date}T${slot.end_time}`),
            employeeId: employeeId,
            id: slot.id,
          }));
          setAppointments(formattedAppointments);
          setAvailability(response.data);
        } catch (error) {
          console.error('Error fetching availability:', error);
        } finally {
          setLoading(false);
        }
      };

      getAvailability();
    }
  }, [employeeId]);

  const handleCreateAvailability = async (startDate, endDate) => {
    const formattedDate = startDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const formattedStartTime = startDate.toTimeString().split(' ')[0]; // HH:MM:SS
    const formattedEndTime = endDate.toTimeString().split(' ')[0]; // HH:MM:SS

    const newAvailability = {
        employee: employeeId,
        date: formattedDate,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        duration: '00:30:00',
    };

    try {
        const response = await createAvailability(employeeId, newAvailability);
        setAppointments((prev) => [
            ...prev,
            {
                text: 'Available',
                startDate,
                endDate,
                employeeId,
                id: response.data.id,
            },
        ]);
        setAvailability((prev) => [...prev, response.data]);
    } catch (error) {
      const errorMessage = error.response?.data || 'An unexpected error occurred.';
      console.error('Error:', errorMessage);
      alert(`Failed to create availability: ${JSON.stringify(errorMessage)}`);
  }
};


  const handleDeleteAvailability = async (availabilityId) => {
    try {
      await deleteAvailability(availabilityId);
      setAppointments((prev) => prev.filter((appt) => appt.id !== availabilityId));
    } catch (error) {
      console.error('Error deleting availability:', error);
    }
  };

  const onAppointmentAdding = (e) => {
    const { startDate, endDate } = e.appointmentData;
    handleCreateAvailability(startDate, endDate);
    e.cancel = true;
  };

  const onAppointmentDeleting = (e) => {
    const { id } = e.appointmentData;
    handleDeleteAvailability(id);
    e.cancel = true;
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="employeeSelect" className="mr-2">Select Employee:</label>
        <select
          id="employeeSelect"
          value={employeeId || ''}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 ${viewMode === 'calendar' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setViewMode('calendar')}
        >
          Calendar View
        </button>
        <button
          className={`px-4 py-2 ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          onClick={() => setViewMode('table')}
        >
          Table View
        </button>
      </div>

      {loading ? (
        <div>Loading availability...</div>
      ) : viewMode === 'calendar' ? (
        <Scheduler
          dataSource={appointments}
          defaultCurrentView="week"
          height={600}
          startDayHour={9}
          endDayHour={22}
          cellDuration={30}
          showAllDayPanel={false}
          onAppointmentAdding={onAppointmentAdding}
          onAppointmentDeleting={onAppointmentDeleting}
        />
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Start Time</th>
              <th className="border border-gray-300 px-4 py-2">End Time</th>
            </tr>
          </thead>
          <tbody>
            {availability.map((slot) => (
              <tr key={slot.id}>
                <td className="border border-gray-300 px-4 py-2">{slot.date}</td>
                <td className="border border-gray-300 px-4 py-2">{slot.start_time}</td>
                <td className="border border-gray-300 px-4 py-2">{slot.end_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeAvailability;
