import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BasicInfo = ({ nextStep, previousStep }) => {
  const [partnerData, setPartnerData] = useState({
    business_name: '',
    website: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('partnerData'));
    if (savedData) {
      setPartnerData(savedData);
    }
  }, []);

  const handleChange = (e) => {
    setPartnerData({
      ...partnerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = {};
    if (!partnerData.business_name) validationErrors.business_name = 'Business name is required';
    if (partnerData.website && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(partnerData.website)) {
      validationErrors.website = 'Please enter a valid URL';
    }
    if (!partnerData.phone) validationErrors.phone = 'Phone number is required';
    if (!partnerData.address) validationErrors.address = 'Address is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    localStorage.setItem('partnerData', JSON.stringify(partnerData));

    toast.success('Partner details submitted successfully!');
    nextStep();
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <div className="text-center mb-6">
            <h3 className="text-3xl justify-start text-gray-900 font-medium sm:hidden">
              Let’s start
            </h3>
        
            <h3 className="hidden sm:block text-3xl text-gray-900 font-medium">
              Let’s Start with Your Business Information
            </h3>
        </div>
        <p className="sm:block hidden text-lg text-gray-700 mb-6 text-center">
          Please fill in the details below so we can connect with you regarding our services and partnership opportunities.
        </p>

        <form onSubmit={handleSubmit} className="space-y-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['business_name', 'website', 'phone'].map((field, idx) => (
                <div key={idx} className="relative mb-4">
                  <input
                    type={field === 'website' ? 'url' : 'text'}
                    id={field}
                    name={field}
                    value={partnerData[field]}
                    onChange={handleChange}
                    required={field !== 'website'}
                    className="w-full px-4 pt-3 pb-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 peer"
                  />
                  <label
                    htmlFor={field}
                    className="absolute left-4 text-gray-500 bg-white px-1 transform -translate-y-1/2 scale-90 peer-focus:top-1 peer-focus:text-blue-500 peer-focus:scale-90 peer-focus:px-1 transition duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                  >
                    {field.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </label>
                  {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                </div>
              ))}

              <div className="relative mb-4 md:col-span-2">
                <textarea
                  id="address"
                  name="address"
                  value={partnerData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 pt-5 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 peer"
                />
                <label
                  htmlFor="address"
                  className="absolute left-4 top-2 text-gray-500 bg-white px-1 transform -translate-y-1/2 scale-90 peer-focus:top-1 peer-focus:text-blue-500 peer-focus:scale-90 peer-focus:px-1 transition duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
                >
                  Address
                </label>
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>

            <div className="flex justify-end items-center space-x-4">
              <button
                type="submit" // Change type to submit
                className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition duration-200"
              >
                Next
              </button>
            </div>
      </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default BasicInfo;
