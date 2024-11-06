import React, { useState } from 'react';
import MainHeader from '../../../components/customer/Header/MainHeader';
import Search from '../../../components/customer/Search/Search';
import Services from '../../../components/customer/Service_list/Services';
import PartnerListView from '../../../components/customer/PartnerListView/PartnerListView';
import UserLocation from '../../../components/customer/UserLocation/UserLocation';

function Home() {
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);
  const [location, setLocation] = useState({ lat: null, lng: null });

  const handleLocationObtained = () => {
    setShowLocationPrompt(false);
  };

  return (
    <div className="flex flex-col">
      <MainHeader />

      {/* Container with equal left and right margins */}
      <div className="mx-6 md:mx-8 lg:mx-16 xl:mx-32 py-8 flex flex-col md:flex-row justify-between"> {/* Adjust margins and layout here */}
        {/* Left section for Search */}
        <div className="flex-1 mr-4 pt-24"> 
          <Search />
        </div>

        {/* Right section for Services */}
        <div className="flex-1 ml-4">
          <Services />
        </div>
      </div>

      {showLocationPrompt && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">We need your location</h2>
            <UserLocation onClose={handleLocationObtained} setLocation={setLocation} />
            <div className="text-center mt-4">
              <button
                onClick={() => setShowLocationPrompt(false)}
                className="bg-indigo-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
