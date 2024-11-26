import React, { useState, useEffect } from 'react';
import MainHeader from '../../../components/customer/Header/MainHeader';
import Search from '../../../components/customer/Search/Search';
import Services from '../../../components/customer/Service_list/Services';
import PartnerListView from '../../../components/customer/PartnerListView/PartnerListView';
import UserLocation from '../../../components/customer/UserLocation/UserLocation';
import Grid from '../../../components/customer/Grid/bentoGrid';
import Stats from '../../../components/customer/stats/Stats';
import Footer from '../../../components/customer/footer/Footer';
// import ServicesList from '../../../components/customer/Service_list/ServicesList';

function Home() {
  // Check localStorage to see if the prompt was previously dismissed
  const initialLocationPrompt = localStorage.getItem('locationPromptDismissed') !== 'true';
  console.log("initialLocationPrompt",initialLocationPrompt);
  

  const [showLocationPrompt, setShowLocationPrompt] = useState(initialLocationPrompt);
  const [location, setLocation] = useState({ lat: null, lng: null });

  // Function called when location is obtained
  const handleLocationObtained = () => {
    setShowLocationPrompt(false);
    // Optionally store the user's decision to not show the prompt again
    localStorage.setItem('locationPromptDismissed', 'true');
  };

  // Close the prompt and remember the choice
  const handleClosePrompt = () => {
    setShowLocationPrompt(false);
    localStorage.setItem('locationPromptDismissed', 'true');
  };

  useEffect(() => {
    // If the location is obtained, we hide the prompt
    if (location.lat && location.lng) {
      setShowLocationPrompt(false);
      localStorage.setItem('locationPromptDismissed', 'true');
    }
  }, [location]);
  console.log(location);
  

  return (
    <div className="flex flex-col">
      <MainHeader />

      {/* Container with equal left and right margins */}
      <div className="mx-6 md:mx-8 lg:mx-16 xl:mx-32 py-8 flex flex-col md:flex-row justify-between">
        {/* Left section for Search */}
        <div className="flex-1 mr-4 pt-20">
          <Search />
        </div>

        {/* Right section for Services */}
       <div className="flex-1 ml-4">
          <Services />
        </div>
      </div>
      <div className='px-24'>
          <PartnerListView location={location}  />
        </div>

        <div className='px-24'>
          <Grid />
        </div>
        <div className='px-24'>
          <Stats />
        </div>
        < div>
          <Footer />
        </div>

      {showLocationPrompt && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4 text-center">We need your location</h2>
            <UserLocation onClose={handleLocationObtained} setLocation={setLocation} />
            <div className="text-center mt-4">
              <button
                onClick={handleClosePrompt}
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
