import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartnerDetailedPage = () => {
  const [partnerDetails, setPartnerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = 'http://localhost:8000/api/v1';
  const hardcodedPartnerId = "57a525a1-73d5-4c8f-a3bf-3cd359489c0f"; // Hardcoded partnerId for testing

  useEffect(() => {
    const fetchPartnerDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/partner/partner-detail/${hardcodedPartnerId}`);
        setPartnerDetails(response.data);
      } catch (error) {
        setError('Failed to fetch partner details');
        console.error('Error fetching partner details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="PartnerDetailsPage md:mx-32 mt-6">
      {/* Partner Name and Address */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{partnerDetails.business_name}</h1>
        <p className="text-gray-600">{partnerDetails.address}</p>
        <p className="text-gray-600">
          Latitude: {partnerDetails.latitude}, Longitude: {partnerDetails.longitude}
        </p>
      </div>

      {/* Shop Image and Website */}
      <div className="flex gap-6">
        {/* Left: License Certificate Image */}
        <div className="w-1/2">
          <img
            src={partnerDetails.license_certificate_image}
            alt={`${partnerDetails.business_name} License`}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Right: Website and Phone */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
          <p className="text-gray-700">
            <strong>Phone:</strong> {partnerDetails.phone}
          </p>
          {partnerDetails.website && (
            <p className="text-blue-500">
              <strong>Website:</strong>{' '}
              <a href={partnerDetails.website} target="_blank" rel="noopener noreferrer">
                {partnerDetails.website}
              </a>
            </p>
          )}
          <p className="text-gray-700">
            <strong>Team Size:</strong> {partnerDetails.team_size}
          </p>
        </div>
      </div>

      {/* Services Offered */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
        <ul className="list-disc pl-4 text-gray-700">
          {partnerDetails.selected_services.map((service, index) => (
            <li key={index}>{service.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PartnerDetailedPage;
