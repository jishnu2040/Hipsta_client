import React, { useState } from 'react';
import axiosInstance from '../../../../utlils/axiosinstance';

const AddHoliday = () => {
  const [holidayDate, setHolidayDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Get partner ID from local storage
  const partnerId = localStorage.getItem('partnerId');

  const handleHolidayDateChange = (e) => setHolidayDate(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!holidayDate || !partnerId) {
      setError('Please provide a valid date and ensure the partner is logged in.');
      return;
    }

    try {
      const response = await axiosInstance.post(
        '/partner/add-holiday/',
        {
          partner: partnerId,
          date: holidayDate,
          description: description,
        }
      );
      setSuccessMessage('Holiday added successfully.');
      setHolidayDate('');
      setDescription('');
    } catch (err) {
      setError('An error occurred while adding the holiday.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add a Holiday</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="holidayDate" className="block text-sm font-medium text-gray-700">Holiday Date</label>
          <input
            type="date"
            id="holidayDate"
            value={holidayDate}
            onChange={handleHolidayDateChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="4"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Add Holiday
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHoliday;
