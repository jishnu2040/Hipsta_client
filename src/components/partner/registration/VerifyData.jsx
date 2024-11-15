import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

const VerifyData = ({ previousStep }) => {
  const userId = useSelector((state) => state.partner.userId);
  const [userData, setUserData] = useState({
    businessName: '',
    website: '',
    phone: '',
    address: '',
    selectedServices: [],
    teamSize: '',
    uploadedFileKey: '',
  });

  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  const serviceMapping = {
    1: 'Salon',
    4: 'Spa',
    7: 'Skin Care',
    8: 'Massage',
  };

  useEffect(() => {
    const partnerData = JSON.parse(localStorage.getItem('partnerData'));
    const selectedServices = JSON.parse(localStorage.getItem('selectedServices'));
    const selectedTeam = localStorage.getItem('selectedTeam');
    const uploadedFileKey = localStorage.getItem('uploadedFileKey');
    
    if (partnerData) {
      setUserData({
        businessName: partnerData.business_name,
        website: partnerData.website,
        phone: partnerData.phone,
        address: partnerData.address,
        selectedServices: selectedServices || [],
        teamSize: selectedTeam || '',
        uploadedFileKey: uploadedFileKey || '',
      });
    }
  }, [userId]);

  const handleVerifyData = async () => {
    // Retrieve latitude and longitude from localStorage
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');

    const dataToSend = {
      user: userId,
      business_name: userData.businessName,
      address: userData.address,
      phone: userData.phone,
      website: userData.website,
      selected_services: userData.selectedServices,
      team_size: userData.teamSize,
      license_certificate_image: userData.uploadedFileKey,
      latitude,  // Add latitude
      longitude, // Add longitude
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/partner/create/', dataToSend);
      if (response.status === 201) {
        alert('Partner data verified and submitted successfully!');
        // Clear localStorage after submission
        localStorage.removeItem('partnerData');
        localStorage.removeItem('selectedServices');
        localStorage.removeItem('selectedTeam');
        localStorage.removeItem('uploadedFileKey');
        localStorage.removeItem('latitude');
        localStorage.removeItem('longitude');
        
        // Set redirect state
        setRedirectToDashboard(true);
      } else {
        alert('Failed to verify data. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting partner data:', error);
      alert('An error occurred while verifying the data.');
    }
  };

  if (redirectToDashboard) {
    return <Navigate to="/partner/dashboard" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Review & Confirm Your Data</h2>

        <section className="space-y-6">
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            <p><strong>Business Name:</strong> {userData.businessName}</p>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            <p><strong>Website:</strong> {userData.website}</p>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            <p><strong>Phone:</strong> {userData.phone}</p>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            <p><strong>Address:</strong> {userData.address}</p>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            <p><strong>Selected Services:</strong> {userData.selectedServices.map(id => serviceMapping[id] || 'Unknown').join(', ')}</p>
          </div>
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            <p><strong>Team Size:</strong> {userData.teamSize}</p>
          </div>
          <div className="flex items-center">
            {userData.uploadedFileKey ? (
              <>
                <FaCheckCircle className="text-green-500 mr-2" />
                <p><strong>Uploaded File:</strong> File uploaded successfully</p>
              </>
            ) : (
              <>
                <FaTimesCircle className="text-red-500 mr-2" />
                <p><strong>Uploaded File:</strong> No file uploaded</p>
              </>
            )}
          </div>
        </section>

        <footer className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={previousStep}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleVerifyData}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          >
            Submit
          </button>
        </footer>
      </div>
    </div>
  );
};

export default VerifyData;
