import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PartnerList from '../../../components/customer/PartnerListing/PartnerList';
import MainHeader from '../../../components/customer/Header/MainHeader';

const PartnerListPage = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const serviceId = params.get('serviceId'); 

  const baseUrl = 'http://localhost:8000/api/v1';

  // Hardcoded latitude and longitude
  const hardcodedLocation = { lat: 12.912596087240933, lng: 77.648887193264740 };

  const savedService = localStorage.getItem('selectedServiceId'); // Get saved serviceId from localStorage

  useEffect(() => {
    const fetchData = async () => {
      try {
        let partnersResponse;

        if (serviceId) {
          // Fetch partners filtered by serviceId in the URL
          partnersResponse = await axios.get(`${baseUrl}/customer/partnerViewFilterByService`, {
            params: { serviceId },
          });
        } else if (savedService) {
          // Use the hardcoded location and saved serviceId for filtering
          const locationString = `${hardcodedLocation.lat},${hardcodedLocation.lng}`;
          partnersResponse = await axios.get(`${baseUrl}/partner/filter-partners/`, {
            params: {
              service: savedService, // Send saved serviceId
              location: locationString, // Send hardcoded location
            },
          });
        } else {
          // Fetch all partners if no filters are available
          partnersResponse = await axios.get(`${baseUrl}/partners`);
        }

        // Set partners data
        setPartners(partnersResponse.data);
      } catch (error) {
        setError('Failed to load data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data if serviceId or savedService exists
    if (serviceId || savedService) {
      fetchData();
    } else {
      setLoading(false); // Stop loading spinner if no data is required
    }
  }, [serviceId, savedService]); 

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
