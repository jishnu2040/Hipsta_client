import React, { useState } from 'react';
import { createPartnerAvailability } from '../../../Services/availabilityService';

const AvailabilityForm = ({ refreshAvailability }) => {
  const [isWeekly, setIsWeekly] = useState(true);
  const [weekday, setWeekday] = useState('');
  const [specificDate, setSpecificDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (startTime >= endTime) {
      console.error("Start time cannot be later than or equal to end time.");
      return;
    }
    if (!isWeekly && !specificDate) {
      console.error("Specific date is required.");
      return;
    }

    const data = {
      is_weekly: isWeekly,
      weekday: isWeekly ? weekday : null,
      specific_date: !isWeekly ? specificDate : null,
      start_time: startTime,
      end_time: endTime,
    };

    try {
      await createPartnerAvailability(data);
      refreshAvailability();
      setIsModalOpen(false); // Close the modal after submission
    } catch (error) {
      console.error('Error setting availability', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        + Add Availability
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 lg:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Set Availability</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isWeekly}
                  onChange={(e) => setIsWeekly(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded border-gray-300"
                />
                <label className="text-sm font-medium text-gray-700">Weekly Availability</label>
              </div>

              {isWeekly ? (
                <div>
                  <label htmlFor="weekday" className="block text-sm font-medium text-gray-700">
                    Day of the Week
                  </label>
                  <select
                    id="weekday"
                    value={weekday}
                    onChange={(e) => setWeekday(e.target.value.toLowerCase())}
                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select a day</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label htmlFor="specificDate" className="block text-sm font-medium text-gray-700">
                    Specific Date
                  </label>
                  <input
                    type="date"
                    id="specificDate"
                    value={specificDate}
                    onChange={(e) => setSpecificDate(e.target.value)}
                    className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              )}

              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityForm;
