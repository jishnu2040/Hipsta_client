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

  useEffect(() => {
    const fetchData = async () => {
      try {



        // Fetch partners for a specific service
        if (serviceId) {
          const partnersResponse = await axios.get(`${baseUrl}/partner/partnerViewFilterByService?serviceId=${serviceId}`);
          setPartners(partnersResponse.data);
        } else {
          // Fetch all partners if no serviceId
          const partnersResponse = await axios.get(`${baseUrl}/partner/allPartners`);
          setPartners(partnersResponse.data);
        }
      } catch (error) {
        setError('Failed to load data');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceId]);

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
        <PartnerList partners={partners}  />
      </div>
    </div>
  );
};

export default PartnerListPage;
