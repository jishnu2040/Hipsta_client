import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyData = () => {
  const {
    userId,
    businessName,
    websiteName,
    serviceType,
    selectedTeamSize,
    lat,
    lng
  } = useSelector((state) => state.partner);

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !businessName || !serviceType || !selectedTeamSize || lat == null || lng == null) {
      toast.error('Incomplete partner data. Please complete all steps before verifying.');
      navigate('/partner/registration');
    }
  }, [userId, businessName, serviceType, selectedTeamSize, lat, lng, navigate]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/partner/create-partner/', {
        user: userId,
        business_name: businessName,
        website: websiteName,
        service_type: serviceType,
        team_size: parseInt(selectedTeamSize, 10),
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      });

      if (response.status === 201) {
        toast.success("Account created successfully");
        console.log('Partner creation successful:', response.data);
        navigate('/partner/dashboard');
      }
    } catch (error) {
      console.error('Error creating partner:', error);
      toast.error('Failed to submit partner data. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify Data</h2>
        <div className="mb-4">
          <p><strong>User ID:</strong> {userId}</p>
          <p><strong>Business Name:</strong> {businessName}</p>
          <p><strong>Website Name:</strong> {websiteName}</p>
          <p><strong>Service Type:</strong> {Array.isArray(serviceType) ? serviceType.join(', ') : serviceType}</p>
          <p><strong>Selected Team Size:</strong> {selectedTeamSize}</p>
          <p><strong>Latitude:</strong> {lat}</p>
          <p><strong>Longitude:</strong> {lng}</p>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Verify and Submit Data
        </button>
      </div>
    </div>
  );
};

export default VerifyData;
