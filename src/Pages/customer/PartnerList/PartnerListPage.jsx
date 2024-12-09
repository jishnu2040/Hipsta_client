import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PartnerList from "../../../components/customer/PartnerListing/PartnerList";
import MainHeader from "../../../components/customer/Header/MainHeader";

const PartnerListPage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const serviceTypeId = params.get("serviceTypeId");

  const baseUrl = "http://localhost:8000/api/v1";
  const stateData = location.state || {}; // Extract location and service from state
  const { location: selectedLocation, service: selectedService } = stateData;

  const hardcodedLocation = { lat: 12.912596087240933, lng: 77.648887193264740 };
  const savedServiceType = localStorage.getItem("selectedServiceTypeId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let partnersResponse;

        if (serviceTypeId) {
          // Fetch partners filtered by serviceTypeId
          partnersResponse = await axios.get(
            `${baseUrl}/customer/partnerViewFilterByService`,
            { params: { serviceTypeId } }
          );
        } else if (selectedService && selectedLocation) {
          // Use the new endpoint for filtering by service and location
          const locationString = `${selectedLocation.lat},${selectedLocation.lng}`;
          partnersResponse = await axios.get(`${baseUrl}/customer/partner-filter/`, {
            params: {
              serviceTypeId: selectedService.id,
              location: locationString,
            },
          });
        } 
        // else if (savedServiceType) {
        //   // Fallback: Use hardcoded location and savedServiceType
        //   const locationString = `${hardcodedLocation.lat},${hardcodedLocation.lng}`;
        //   partnersResponse = await axios.get(`${baseUrl}/customer/partners/`, {
        //     params: {
        //       serviceType: savedServiceType,
        //       location: locationString,
        //     },
        //   });
        // } 
        else {
          // Fetch all partners as a fallback
          partnersResponse = await axios.get(`${baseUrl}/customer/partners`);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <MainHeader />

      {/* Content */}
      <div className="PartnerPage md:mx-32 mt-6">
        <PartnerList partners={partners} />
      </div>
    </div>
  );
};

export default PartnerListPage;
