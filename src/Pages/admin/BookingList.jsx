import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'booked', 'completed', 'canceled'

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/admin/booking-Details/');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredBookings = statusFilter === 'all'
    ? bookings
    : bookings.filter((booking) => booking.status === statusFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  return (
    <div className="p-2  rounded-lg ">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Booking List</h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="status-filter" className="mr-2 text-gray-600">Filter by Status:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={handleStatusFilterChange}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="all">All</option>
          <option value="booked">Booked</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-600 text-sm uppercase font-semibold">
            <tr>
              <th className="py-3 px-6 text-left">Booking ID</th>
              <th className="py-3 px-6 text-left">Customer</th>
              <th className="py-3 px-6 text-left">Partner</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-t hover:bg-gray-100">
                  <td className="py-3 px-6">{booking.id}</td>
                  <td className="py-3 px-6">{booking.customer_name}</td>
                  <td className="py-3 px-6">{booking.partner_name}</td>
                  <td className="py-3 px-6">{booking.date}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        booking.status === 'booked'
                          ? 'bg-green-100 text-green-600'
                          : booking.status === 'canceled'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-yellow-100 text-yellow-600'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                  No bookings available for this filter
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredBookings.length === 0 && (
        <div className="text-center py-6 text-gray-500">No bookings available</div>
      )}
    </div>
  );
};

export default BookingList;
