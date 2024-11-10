import React, { useEffect, useState } from 'react';



const VerifyData = ({previousStep}) => {
  const [userData, setUserData] = useState({
    businessName: '',
    website: '',
    phone: '',
    address: '',
    selectedServices: [],
    teamSize: '',
    latitude: '',
    longitude: '',
  });


  useEffect(() => {
    // Retrieve data from localStorage
    const partnerData = JSON.parse(localStorage.getItem('partnerData'));
    const latitude = localStorage.getItem('latitude');
    const longitude = localStorage.getItem('longitude');
    const selectedServices = JSON.parse(localStorage.getItem('selectedServices'));
    const selectedTeam = localStorage.getItem('selectedTeam');

    if (partnerData) {
      setUserData({
        businessName: partnerData.business_name,
        website: partnerData.website,
        phone: partnerData.phone,
        address: partnerData.address,
        selectedServices: selectedServices || [],
        teamSize: selectedTeam || '',
        latitude: latitude || '',
        longitude: longitude || '',
      });
    }
  }, []);

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify Data</h2>
        <div className="mb-4">
          <p><strong>Business Name:</strong> {userData.businessName}</p>
          <p><strong>Website:</strong> {userData.website}</p>
          <p><strong>Phone:</strong> {userData.phone}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Selected Services:</strong> {userData.selectedServices.join(', ')}</p>
          <p><strong>Team Size:</strong> {userData.teamSize}</p>
          <p><strong>Latitude:</strong> {userData.latitude}</p>
          <p><strong>Longitude:</strong> {userData.longitude}</p>
        </div>
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={previousStep}
            className="text-gray-800 px-6 py-2 rounded-lg font-semibold hover:text-blue-600 transition duration-200"
          >
            Previous
          </button>
          <button
          type="button"
          onClick={() => alert('Data verified successfully!')}
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Verify Data
        </button>
    </div>
      </div>
    </div>
  );
};

export default VerifyData;
