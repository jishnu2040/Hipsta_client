import React, { useState, useEffect } from "react";
import MainHeader from "../../../components/customer/Header/MainHeader";
import ServiceTypes from "../../../components/customer/Service_list/ServiceTypes";
import PartnerListView from "../../../components/customer/PartnerListView/PartnerListView";
import UserLocation from "../../../components/customer/UserLocation/UserLocation";
import Stats from "../../../components/customer/stats/Stats";
import Footer from "../../../components/customer/footer/Footer";
import Search from "../../../components/customer/Search/Search";
import Banner from "../../../components/customer/banner/Banner";

function Home() {
  const initialLocationPrompt = localStorage.getItem("locationPromptDismissed") !== "true";
  const [showLocationPrompt, setShowLocationPrompt] = useState(initialLocationPrompt);
  const [location, setLocation] = useState(() => {
    // Fetch location from localStorage during initial render
    const storedLocation = localStorage.getItem("userLocation");
    return storedLocation ? JSON.parse(storedLocation) : { lat: null, lng: null };
  });

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
    // Save location to localStorage
    localStorage.setItem("userLocation", JSON.stringify(selectedLocation));
  };

  const handleServiceSelected = (service) => {
    console.log("Selected service:", service);
  };

  useEffect(() => {
    // Dismiss prompt if location is already set
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
          <ServiceTypes />
        </div>
      </div>
      <div className="px-24">
        <PartnerListView location={location} />
      </div>
      <div className="px-24">
        <Stats />
      </div>
      <Footer />
      {showLocationPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
              Allow Location Access
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              We need your location to provide better services near you.
            </p>
            <UserLocation onClose={handleLocationObtained} setLocation={handlePlaceSelected} />
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleClosePrompt}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition"
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
