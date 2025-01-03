import React, { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { getPartnerAvailability, deletePartnerAvailability, updatePartnerAvailability } from '../../../Services/availabilityService';
import AvailabilityForm from './AvailabilityForm';
import { ToastContainer, toast } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import styles for React-Toastify
import AddHoliday from './AddHoliday'; // Import the AddHoliday component

const AvailabilityList = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editAvailability, setEditAvailability] = useState(null);
  const [showAddHoliday, setShowAddHoliday] = useState(false); // State to control the display of AddHoliday form

  const fetchAvailability = async () => {
    try {
      const data = await getPartnerAvailability();
      setAvailabilities(data);
    } catch (error) {
      console.error('Error fetching availabilities:', error);
      toast.error('Failed to load availability data.');
      if (error.response && error.response.status === 403) {
        setError('You do not have permission to view this data.');
      } else {
        setError('An error occurred while fetching availabilities.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePartnerAvailability(id);
      fetchAvailability(); // Refresh list after deletion
      toast.success('Availability deleted successfully!');
    } catch (error) {
      console.error('Error deleting availability:', error);
      toast.error('Failed to delete availability.');
    }
  };

  const handleEdit = (availability) => {
    setEditAvailability(availability); // Set the availability to be edited
  };

  const handleSaveEdit = async (id, data) => {
    try {
      await updatePartnerAvailability(id, data);
      fetchAvailability(); // Refresh the list after updating
      setEditAvailability(null); // Clear the editing state
      toast.success('Availability updated successfully!');
    } catch (error) {
      console.error('Error updating availability:', error);
      toast.error('Failed to update availability.');
    }
  };

  return (
    <div className="p-6  min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Manage Availability</h2>

      {/* Button to toggle the AddHoliday form */}
      <button
        onClick={() => setShowAddHoliday(!showAddHoliday)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        {showAddHoliday ? 'Cancel Holiday Form' : 'Add Holiday'}
      </button>

      {/* Conditionally render AddHoliday component */}
      {showAddHoliday && <AddHoliday />}

      <AvailabilityForm
        refreshAvailability={fetchAvailability}
        editAvailability={editAvailability}
        onSaveEdit={handleSaveEdit}
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="mt-8">
          {availabilities.length > 0 ? (
            <div className="flex">
              {availabilities.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <div className="flex flex-col">
                    <div className="text-lg font-semibold text-gray-800 mb-2">
                      {item.is_weekly
                        ? `${item.weekday.charAt(0).toUpperCase() + item.weekday.slice(1)}`
                        : `Date-specific - ${new Date(item.specific_date).toLocaleDateString()}`}
                    </div>
                    <div className="text-gray-600 text-sm mb-4">
                      {`${item.start_time} to ${item.end_time}`}
                    </div>
                    <div className="flex justify-end items-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-800 hover:text-red-600 transition-all duration-200 transform hover:scale-105"
                      >
                        <AiFillDelete size={24} />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-500 hover:text-blue-600 transition-all duration-200 transform hover:scale-105"
                      >
                        <AiFillEdit size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No availabilities found. Please add some.</p>
          )}
        </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default AvailabilityList;
