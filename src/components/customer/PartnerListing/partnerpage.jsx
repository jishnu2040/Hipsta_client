import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import PartnerProfilesPage from './PartnerProfilesPage';
import MainHeader from '../Header/MainHeader';

const PartnerPage = () => {
  const [partners, setPartners] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const serviceId = params.get('serviceId'); 

  const baseUrl = 'http://localhost:8000/api/v1'; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services
        const servicesResponse = await axios.get(`${baseUrl}/core/service_type/`);
        setServices(servicesResponse.data);
        
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

  // If serviceId is provided, filter the partners based on selected_services
  const filteredPartners = serviceId
    ? partners.filter(partner =>
        partner.selected_services.includes(parseInt(serviceId))
      )
    : partners;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <MainHeader />

      {/* Content */}
      <div className="PartnerPage md:mx-32 mt-6">
        <PartnerProfilesPage partners={filteredPartners} services={services} />
      </div>
    </div>
  );
};

export default PartnerPage;
