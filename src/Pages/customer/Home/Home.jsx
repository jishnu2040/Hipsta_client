import React, { useState, useEffect } from "react";
import MainHeader from "../../../components/customer/Header/MainHeader";
import ServiceTypes from "../../../components/customer/Service_list/ServiceTypes";
import PartnerListView from "../../../components/customer/PartnerListView/PartnerListView";
import UserLocation from "../../../components/customer/UserLocation/UserLocation";
import Grid from "../../../components/customer/Grid/bentoGrid";
import Stats from "../../../components/customer/stats/Stats";
import Footer from "../../../components/customer/footer/Footer";
import Search from "../../../components/customer/Search/Search";
import Banner from "../../../components/customer/banner/Banner";

function Home() {
  const initialLocationPrompt = localStorage.getItem("locationPromptDismissed") !== "true";

  const [showLocationPrompt, setShowLocationPrompt] = useState(initialLocationPrompt);
  const [location, setLocation] = useState({ lat: null, lng: null });


  
  const handleLocationObtained = () => {
    setShowLocationPrompt(false);
    localStorage.setItem("locationPromptDismissed", "true");
  };

  const handleClosePrompt = () => {
    setShowLocationPrompt(false);
    localStorage.setItem("locationPromptDismissed", "true");
  };

  const handlePlaceSelected = (selectedLocation) => {
    console.log("Selected place:", selectedLocation.address);
    console.log("Latitude:", selectedLocation.lat);
    console.log("Longitude:", selectedLocation.lng);
    setLocation(selectedLocation);
  };

  const handleServiceSelected = (service) => {
    console.log("Selected service:", service);
    setSelectedService(service);
  };

  useEffect(() => {
    if (location.lat && location.lng) {
      setShowLocationPrompt(false);
      localStorage.setItem("locationPromptDismissed", "true");
    }
  }, [location]);

  return (
    <div className="flex flex-col">
      <MainHeader />
      <div className="mx-6 md:mx-8 lg:mx-16 xl:mx-32 py-8 flex flex-col md:flex-row justify-between">
        <div className="flex-1 mr-4 ">
          <Search onPlaceSelected={handlePlaceSelected} onServiceSelected={handleServiceSelected} />

          <Banner />
        </div>
        <div className="flex-1 ml-4">
          <ServiceTypes  />
        </div>
      </div>
      <div className="px-24">
        <PartnerListView location={location} />
      </div>
      <div className="px-24">
        <Grid />
      </div>
      <div className="px-24">
        <Stats />
      </div>
      <Footer />
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
