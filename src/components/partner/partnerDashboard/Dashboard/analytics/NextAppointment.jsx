import React, { useEffect, useState } from "react";
import axios from "axios";

const NextAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const partnerId = localStorage.getItem("partnerId"); // Fetch partnerId from local storage

  useEffect(() => {
    if (partnerId) {
      // Fetch appointments data from the API
      axios
        .get(`http://localhost:8000/api/v1/booking/${partnerId}/`)
        .then((response) => {
          // Assuming the response contains an array of appointments
          const sortedAppointments = response.data.appointments
            .map((appointment) => ({
              ...appointment,
              dateTime: new Date(`${appointment.date}T${appointment.start_time}`), // Combine date and start_time into a Date object
            }))
            .sort((a, b) => a.dateTime - b.dateTime) // Sort by dateTime (nearest first)
            .slice(0, 3); // Get the next 3 appointments

          setAppointments(sortedAppointments);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching appointments:", error);
          setLoading(false);
        });
    } else {
      console.error("Partner ID not found in local storage");
      setLoading(false);
    }
  }, [partnerId]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }
  const formatTime = (time) => {
    // Split the time into hours and minutes
    const [hours, minutes] = time.split(":");
    
    // Create a new Date object with today's date and the given time
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
  
    // Format the time in 12-hour format with AM/PM
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString([], options);
  };
  
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Next Appointments</h3>
      <ul className="space-y-4">
        {appointments.length === 0 ? (
          <li>No upcoming appointments.</li> // If no appointments are available
        ) : (
          appointments.map((appointment) => (
            <li
              key={appointment.id}
              className="border-b last:border-0 pb-4 flex justify-between items-center"
            >
              <div>
                <p className="text-gray-800 font-medium">
                  {appointment.customer_name}
                </p>
                <p className="text-sm text-gray-600">
                  {appointment.service_name}
                </p>
                <p className="text-sm text-blue-600">
                  Specialist: {appointment.employee_name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{appointment.date}</p>
                <p className="text-sm text-red-600">
                  {formatTime(appointment.start_time)}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NextAppointment;
