import React, { useState, useEffect } from "react";
import MainHeader from "../../../components/customer/Header/MainHeader";
import ServiceTypes from "../../../components/customer/Service_list/ServiceTypes";
import PartnerListView from "../../../components/customer/PartnerListView/PartnerListView";
import Footer from "../../../components/customer/footer/Footer";
import Search from "../../../components/customer/Search/Search";
import Banner from "../../../components/customer/banner/Banner";
import Business from "../../../components/customer/CTA/Business";
import ShimmerHome from "./ShimmerHome";

function Home() {
  const [loading, setLoading] = useState(true);
  const initialLocationPrompt = localStorage.getItem("locationPromptDismissed") !== "true";
  const [showLocationPrompt, setShowLocationPrompt] = useState(initialLocationPrompt);
  const [location, setLocation] = useState(() => {
    const storedLocation = localStorage.getItem("userLocation");
    return storedLocation ? JSON.parse(storedLocation) : { lat: null, lng: null };
  });
  const [error, setError] = useState(null);

  const handleLocationObtained = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = { lat: latitude, lng: longitude };

        // Save to state and local storage
        setLocation(userLocation);
        localStorage.setItem("userLocation", JSON.stringify(userLocation));
        localStorage.setItem("locationPromptDismissed", "true");
        setShowLocationPrompt(false);
        setError(null);
      },
      (err) => {
        setError("Unable to fetch location. Please try again or enable location access.");
        console.error("Geolocation error:", err);
      }
    );
  };

  const handleClosePrompt = () => {
    setShowLocationPrompt(false);
    localStorage.setItem("locationPromptDismissed", "true");
  };

  const handlePlaceSelected = (selectedLocation) => {
    setLocation(selectedLocation);
    localStorage.setItem("userLocation", JSON.stringify(selectedLocation));
  };

  useEffect(() => {
    if (location.lat && location.lng) {
      setShowLocationPrompt(false);
      localStorage.setItem("locationPromptDismissed", "true");
    }

    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer); // Cleanup timeout on component unmount
  }, [location]);

  if (loading) {
    return <ShimmerHome />;
  }

  return (
    <div className="flex flex-col">
      <MainHeader />
      <div className="mx-6 md:mx-8 lg:mx-16 xl:mx-32 py-8 flex flex-col md:flex-row justify-between">
        <div className="flex-1 mr-4">
          <Search onPlaceSelected={handlePlaceSelected} />
          <Banner />
        </div>
        <div className="flex-1 ml-4">
          <ServiceTypes />
        </div>
      </div>``
      <div className=" sm:px-24">
        <PartnerListView location={location} />
      </div>
      <div className=" sm:px-24 ">
        <Business />
      </div>
      <Footer />
      {showLocationPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Allow Location Access</h2>
          <p className="text-sm text-gray-500 mb-4">We need your location to provide better services near you.</p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="space-x-4">
            <button
              onClick={handleLocationObtained}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg"
            >
              Allow
            </button>
            <button
              onClick={handleClosePrompt}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
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
