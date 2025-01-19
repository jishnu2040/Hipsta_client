import React, { useState, useEffect } from 'react';
import MainHeader from '../../../components/customer/Header/MainHeader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PartnerDetails from '../../../components/customer/partnerDetails/PartnerDetails'

const PartnerDetailedPage = () => {
  const { partnerId } = useParams(); // Get partnerId from URL
  const [partnerDetails, setPartnerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 


  useEffect(() => {
    const fetchPartnerDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}customer/partner-detail/${partnerId}`);
        setPartnerDetails(response.data);
      } catch (error) {
        setError('Failed to fetch partner details');
        console.error('Error fetching partner details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerDetails();
  }, [partnerId]); 



  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <MainHeader />
      <div className="PartnerDetailsPage mx-2 mt-0 md:mx-32 md:mt-6">
        {/* Pass partnerDetails as props to the child component */}
        <PartnerDetails partnerDetails={partnerDetails} />
      </div>
    </div>
  );
};

export default PartnerDetailedPage;
