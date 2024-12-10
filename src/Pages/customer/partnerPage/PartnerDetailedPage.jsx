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

  const baseUrl = 'http://localhost:8000/api/v1';

  useEffect(() => {
    const fetchPartnerDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/customer/partner-detail/${partnerId}`);
        setPartnerDetails(response.data);
      } catch (error) {
        setError('Failed to fetch partner details');
        console.error('Error fetching partner details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerDetails();
  }, [partnerId]); // Re-fetch when partnerId changes

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
      <div className="PartnerDetailsPage md:mx-32 mt-6">
        {/* Pass partnerDetails as props to the child component */}
        <PartnerDetails partnerDetails={partnerDetails} />
      </div>
    </div>
  );
};

export default PartnerDetailedPage;
