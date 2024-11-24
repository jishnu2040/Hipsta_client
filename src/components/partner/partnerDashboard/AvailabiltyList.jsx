import React, { useState, useEffect } from 'react';
import { getPartnerAvailability, deletePartnerAvailability } from '../../../Services/availabilityService';
import AvailabilityForm from './AvailabilityForm';

const AvailabilityList = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loader state

  const fetchAvailability = async () => {
    try {
      const data = await getPartnerAvailability();
      setAvailabilities(data);
    } catch (error) {
      console.error('Error fetching availabilities:', error);
      if (error.response && error.response.status === 403) {
        setError('You do not have permission to view this data.');
      } else {
        setError('An error occurred while fetching availabilities.');
      }
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePartnerAvailability(id);
      fetchAvailability(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting availability:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Manage Assigned Availability</h2>
      <AvailabilityForm refreshAvailability={fetchAvailability} />

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="mt-8">
          {availabilities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {availabilities.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
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
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-gray-800 hover:bg-red-600 text-white py-2 px-2 rounded-md text-sm transition-all duration-200 transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No availabilities found. Please add some.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailabilityList;
