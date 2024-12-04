import React from 'react';
import PartnerAvailability from './PartnerAvailability';

const PartnerDetails = ({ partnerDetails }) => {
  const S3_BASE_URL = 'https://hipsta-s3.s3.ap-south-1.amazonaws.com/';

  return (
    <div className="flex flex-col">
      {/* Partner Name and Address */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{partnerDetails.business_name}</h1>
        <p className="text-gray-600">{partnerDetails.address}</p>
      </div>

      <div className="flex gap-6">
        {/* Left: Shop Image */}
        <div className="w-1/2">
          <img
            src={`${S3_BASE_URL}${partnerDetails.image_slides[0]?.image_url}`}
            alt="Shop Image"
            className="w-full h-auto object-cover rounded"
          />
        </div>

        {/* Right: Contact Information and Availability */}
        <div className="w-1/2">
          {/* Contact Information */}
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
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

          {/* Partner Availability */}
          <div className="mt-4 p-10">
            <PartnerAvailability partnerId={partnerDetails.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
