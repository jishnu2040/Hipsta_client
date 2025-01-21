import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PartnerList from "../../../components/customer/PartnerListing/PartnerList";
import MainHeader from "../../../components/customer/Header/MainHeader";
import ShimmerPartnerCard from './ShimmerPartnerCard'



const PartnerListPage = () => {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 


  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const serviceTypeId = params.get("serviceTypeId");
  const stateData = location.state || {}; 
  const { location: selectedLocation, service: selectedService } = stateData;

  console.log("Selected Location:", selectedLocation);
  console.log("Selected Service:", selectedService);
  

  const hardcodedLocation = { lat: 12.912596087240933, lng: 77.648887193264740 };
  const savedServiceType = localStorage.getItem("1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let partnersResponse;
  
        if (serviceTypeId) {
          partnersResponse = await axios.get(
            `${API_BASE_URL}customer/partnerViewFilterByService`,
            { params: { serviceTypeId } }
          );
        } else if (selectedService && selectedLocation) {
          const locationString = `${selectedLocation.lat},${selectedLocation.lng}`;
          partnersResponse = await axios.get(`${API_BASE_URL}customer/partner-filter/`, {
            params: {
              serviceTypeId: selectedService.id,
              location: locationString,
            },
          });
        } else {
          partnersResponse = await axios.get(`${API_BASE_URL}/customer/partners`);
        }
  
        setPartners(partnersResponse.data);
      } catch (error) {
        setError("Failed to load data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [serviceTypeId, selectedService, selectedLocation, savedServiceType]);
  

  

  if (loading) {
    return (
      <div className="flex flex-col">
        {/* Header */}
        <MainHeader />
        
        {/* Shimmer Placeholder */}
        <div className="PartnerPage md:mx-32 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6) 
            .fill("")
            .map((_, index) => (
              <ShimmerPartnerCard key={index} />
            ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <MainHeader />

      {/* Content */}
      <div className="PartnerPage">
        <PartnerList partners={partners} />
      </div>
    </div>
  );
};

export default PartnerListPage;
