import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyData = ({ previousStep }) => {
  // Retrieve the user ID from localStorage
  const userId = localStorage.getItem('user_id');
  
  // Handle case where userId is not available in localStorage
  if (!userId) {
    console.error('User ID not found in localStorage!');
    // Optionally, you can redirect to another page or show an error here
  }

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
    2: 'Spa',
    3: 'Makeup',
    4: 'Bride',
    5: 'Aromatherapy',
    6: 'Wellness',
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
  }, []);

  const handleVerifyData = async () => {
    // Retrieve latitude and longitude from localStorage
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');
  
    const dataToSend = {
      user: userId,  // Ensure user_id is being passed correctly
      business_name: userData.businessName,
      address: userData.address,
      phone: userData.phone,
      website: userData.website,
      selected_services: userData.selectedServices,
      team_size: userData.teamSize,
      license_certificate_image: userData.uploadedFileKey,
      latitude, 
      longitude, 
    };
  
    try {
      const response = await axios.post('http://localhost:8000/api/v1/partner/create/', dataToSend);
      if (response.status === 201 || response.status === 200) {
        toast.success('Partner data submitted successfully!');
        // Clear localStorage after submission
        localStorage.removeItem('partnerData');
        localStorage.removeItem('selectedServices');
        localStorage.removeItem('selectedTeam');
        localStorage.removeItem('uploadedFileKey');
        localStorage.removeItem('latitude');
        localStorage.removeItem('longitude');
        
        // Set redirect state
        setTimeout(() => setRedirectToDashboard(true), 3000);
      } else {
        toast.error('Failed to verify data. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting partner data:', error);
      toast.error('An error occurred while verifying the data.');
    }
  };
  

  if (redirectToDashboard) {
    return <Navigate to="/login" />;
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

      {/* Toast Container for showing notifications */}
      <ToastContainer />
    </div>
  );
};

export default VerifyData;
