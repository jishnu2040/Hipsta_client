import React, { useState, useEffect } from 'react';
import { fetchAvailability, createAvailability, deleteAvailability } from '../../../Services/employeeAvailabilityService';
import { Scheduler } from 'devextreme-react/scheduler';

const EmployeeAvailability = () => {
  const employeeId = 'df14a9d7-1698-4c3f-a926-cf9c29224536'; // Static employee ID for testing
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]); // State to store appointment data
  const [viewMode, setViewMode] = useState('calendar'); // View mode toggle ("calendar" or "table")

  // Function to format date to YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Returns date in YYYY-MM-DD format
  };

  // Function to format time to hh:mm:ss format
  const formatTime = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Invalid date object:", date);
      return "00:00:00"; // Default fallback time if invalid
    }
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  // Fetch availability from backend and update appointments
  useEffect(() => {
    const getAvailability = async () => {
      setLoading(true);
      try {
        const response = await fetchAvailability(employeeId);
        const availabilityData = response.data;
  
        // Map availability data to the format required by the Scheduler
        const formattedAppointments = availabilityData.map(slot => ({
          text: 'Available',
          startDate: new Date(`${slot.date}T${slot.start_time}`),
          endDate: new Date(`${slot.date}T${slot.end_time}`),
          employeeId: employeeId,
          id: slot.id,
        }));
  
        setAppointments(formattedAppointments);
        setAvailability(availabilityData);
      } catch (error) {
        console.error("Error fetching availability data", error);
        alert('Failed to load availability. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    getAvailability();
  }, [employeeId]);

const handleCreateBatchAvailability = async (date, startTime, endTime) => {
  const formattedDate = formatDate(date);
  const formattedStartTime = formatTime(new Date(startTime));
  const formattedEndTime = formatTime(new Date(endTime));

  if (formattedStartTime === "00:00:00" || formattedEndTime === "00:00:00") {
    console.error("Invalid start or end time detected.");
    return;
  }

  // Calculate duration in milliseconds
  const start = new Date(`${formattedDate}T${formattedStartTime}`);
  const end = new Date(`${formattedDate}T${formattedEndTime}`);
  
  const durationInMilliseconds = end - start; // Duration in milliseconds
  
  if (isNaN(durationInMilliseconds) || durationInMilliseconds <= 0) {
    console.error("Invalid duration detected.");
    return;
  }

  // Convert milliseconds to hours, minutes, and seconds
  const totalSeconds = Math.floor(durationInMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Format duration in hh:mm:ss
  const formattedDuration = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const newAvailability = {
    employee: employeeId,
    date: formattedDate,
    start_time: formattedStartTime,
    end_time: formattedEndTime,
    duration: formattedDuration, // Send duration in hh:mm:ss format
  };

  try {
    const response = await createAvailability(newAvailability);
    setAvailability((prevState) => [...prevState, response.data]);

    // Update the appointments for the Scheduler
    setAppointments((prevAppointments) => [
      ...prevAppointments,
      {
        text: 'Available',
        startDate: start,
        endDate: end,
        employeeId: employeeId,
        id: response.data.id, // Use the unique ID from the response
      },
    ]);
  } catch (error) {
    console.error("Error creating batch availability", error);
  }
};

  

  const handleDeleteAvailability = async (availabilityId) => {
    try {
      await deleteAvailability(availabilityId);
      // Remove the deleted appointment from state
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment.id !== availabilityId)
      );
    } catch (error) {
      console.error("Error deleting availability", error);
      alert('Failed to delete availability. Please try again later.');
    }
  };

  const onAppointmentAdding = (e) => {
    const { startDate, endDate } = e.appointmentData;
    handleCreateBatchAvailability(startDate, startDate, endDate);
    e.cancel = true; // Prevent default behavior (adding directly in the calendar)
  };

  const onAppointmentUpdating = (e) => {
    const { startDate, endDate } = e.newAppointmentData;
    handleCreateBatchAvailability(startDate, startDate, endDate);
    e.cancel = true; // Prevent default behavior
  };

  const onAppointmentDeleting = (e) => {
    const { id } = e.appointmentData;
    handleDeleteAvailability(id);
    e.cancel = true; // Prevent default behavior (deletion from the calendar)
  };

  return (
    <div>
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
          resources={[{
            fieldExpr: 'employeeId',
            allowMultiple: false,
            dataSource: [{ id: employeeId, text: 'Employee 1' }],
            label: 'Employee',
            valueExpr: 'id',
            displayExpr: 'text',
          }]}
          groups={['employeeId']}
          onAppointmentAdding={onAppointmentAdding}
          onAppointmentUpdating={onAppointmentUpdating}
          onAppointmentDeleting={onAppointmentDeleting} // Add delete handler
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Start Time</th>
                <th className="border border-gray-300 px-4 py-2">End Time</th>
                <th className="border border-gray-300 px-4 py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {availability.length > 0 ? (
                availability.map((slot) => (
                  <tr key={slot.id}>
                    <td className="border border-gray-300 px-4 py-2">{slot.date}</td>
                    <td className="border border-gray-300 px-4 py-2">{slot.start_time}</td>
                    <td className="border border-gray-300 px-4 py-2">{slot.end_time}</td>
                    <td className="border border-gray-300 px-4 py-2">{slot.duration}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center border border-gray-300 px-4 py-2"
                  >
                    No availability found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EmployeeAvailability;