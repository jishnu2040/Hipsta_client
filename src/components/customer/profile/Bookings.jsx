import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utlils/axiosinstance';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const Bookings = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      axiosInstance
        .get('booking/appointments/')
        .then((response) => {
          const sortedAppointments = response.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setAppointments(sortedAppointments);
          setLoading(false);
        })
        .catch((error) => {
          setError('Error fetching appointments');
          setLoading(false);
        });
    } else {
      setError('User not authenticated');
      setLoading(false);
    }
  }, [userId]);

  const handleChangeStatus = (appointmentId) => {
    axiosInstance
      .patch(`booking/appointments/${appointmentId}/cancel/`, { status: 'canceled' })
      .then(() => {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, status: 'Cancelled' } // Ensure consistent display
              : appointment
          )
        );
        setModalVisible(false);
        setSelectedAppointment(null);
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.status || "Failed to change status.";
        alert(errorMsg);
      });
  };
  

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5 text-red-600">{error}</div>;
  }

  const statusIcon = (status) => {
    switch (status) {
      case 'Confirmed':
        return <FaCheckCircle className="text-green-500" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-red-500" />;
      case 'Pending':
        return <FaClock className="text-yellow-500" />;
      default:
        return null;
    }
  };

  const isUpcoming = (appointmentDate) => {
    const today = new Date();
    const appointment = new Date(appointmentDate);
    return appointment >= today;
  };

  const upcomingAppointments = appointments.filter((appointment) =>
    isUpcoming(appointment.date)
  );
  const pastAppointments = appointments.filter((appointment) =>
    !isUpcoming(appointment.date)
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Modal */}
      {modalVisible && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-1/4 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Confirm Change</h2>
            <p>
              Are you sure you want to change the status of the booking ?
            </p>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => setModalVisible(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleChangeStatus(selectedAppointment.id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Appointments */}
      {upcomingAppointments.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upcoming Bookings</h2>
          <div className="overflow-x-auto rounded-xl shadow-xl">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left font-medium">Date</th>
                  <th className="py-3 px-6 text-left font-medium">Partner Name</th>
                  <th className="py-3 px-6 text-left font-medium">Start Time</th>
                  <th className="py-3 px-6 text-left font-medium">Status</th>
                  <th className="py-3 px-6 text-left font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
              {upcomingAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="py-3 px-6 text-gray-700">{appointment.date}</td>
                  <td className="py-3 px-6 text-gray-700">{appointment.partner_name}</td>
                  <td className="py-3 px-6 text-gray-700">{appointment.start_time}</td>
                  <td className="py-3 px-6 text-gray-700 flex items-center space-x-2">
                    {statusIcon(appointment.status)}
                    <span>{appointment.status}</span>
                  </td>
                  <td className="py-3 px-6 text-gray-700">
                    {appointment.status !== 'Canceled' && appointment.status !== 'canceled' && (
                      <button
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setModalVisible(true);
                        }}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Past Bookings</h2>
          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th className="py-3 px-6 text-left font-medium">Partner Name</th>
                  <th className="py-3 px-6 text-left font-medium">Date</th>
                  <th className="py-3 px-6 text-left font-medium">Start Time</th>
                  <th className="py-3 px-6 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {pastAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="py-3 px-6 text-gray-700">{appointment.partner_name}</td>
                    <td className="py-3 px-6 text-gray-700">{appointment.date}</td>
                    <td className="py-3 px-6 text-gray-700">{appointment.start_time}</td>
                    <td className="py-3 px-6 text-gray-700 flex items-center space-x-2">
                      {statusIcon(appointment.status)}
                      <span>{appointment.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!upcomingAppointments.length && !pastAppointments.length && (
        <p className="text-center py-5 text-gray-500">No appointments found.</p>
      )}
    </div>
  );
};

export default Bookings;
