import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { setBusinessName, setWebsiteName } from '../../Redux/slices/partnerSlice';

const BasicInfo = () => {
  const userId = useSelector((state) => state.partner.userId);
  const dispatch = useDispatch();
  
  const [partnerData, setPartnerData] = useState({
    business_name: '',
    website: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPartnerData({
      ...partnerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the business name and website name to Redux store
    dispatch(setBusinessName(partnerData.business_name));
    dispatch(setWebsiteName(partnerData.website));

    toast.success('Partner details saved successfully');
    setErrors({});

    setTimeout(() => {
      navigate('/services'); // Navigate to the services component
    }, 1000);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div>
          <h2>User ID from Redux: {userId}</h2>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Partner Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="business_name" className="block text-gray-700 font-medium mb-2">Business Name</label>
            <input
              type="text"
              id="business_name"
              name="business_name"
              value={partnerData.business_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.business_name && <p className="text-red-500 text-sm">{errors.business_name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="website" className="block text-gray-700 font-medium mb-2">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={partnerData.website}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.website && <p className="text-red-500 text-sm">{errors.website}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit Partner Details
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default BasicInfo;
