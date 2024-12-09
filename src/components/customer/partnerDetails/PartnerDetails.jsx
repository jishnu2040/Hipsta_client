import React from 'react';
import PartnerAvailability from './PartnerAvailability';
import Services from './Services';

const PartnerDetails = ({ partnerDetails }) => {
  const S3_BASE_URL = 'https://hipsta-s3.s3.ap-south-1.amazonaws.com/';

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      {/* Partner Name and Address */}
      <div className="mb-8 flex flex-col md:flex-row gap-6">
        <h1 className="text-4xl font-semibold text-gray-900">{partnerDetails.business_name}</h1>
        <p className="text-gray-600 text-xl mt-2 md:mt-0">{partnerDetails.address}</p>
      </div>

      {/* Main Content Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left: Shop Image */}
        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <img
            src={`${S3_BASE_URL}${partnerDetails.image_slides[0]?.image_url}`}
            alt="Shop Image"
            className="w-full h-96 object-cover"
          />
        </div>

        {/* Right: Contact Information and Availability */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">Contact Information</h3>
            <p className="text-gray-700 mt-2">
              <strong className="font-medium">Phone:</strong> {partnerDetails.phone}
            </p>
            {partnerDetails.website && (
              <p className="text-blue-600 mt-2">
                <strong className="font-medium">Website:</strong>{' '}
                <a href={partnerDetails.website} target="_blank" rel="noopener noreferrer">
                  {partnerDetails.website}
                </a>
              </p>
            )}
          </div>

          {/* Partner Availability */}
          <div className="mt-8">
            <h4 className="text-xl font-semibold text-gray-800 mb-4">Availability</h4>
            <PartnerAvailability partnerId={partnerDetails.id} />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="mt-12">

        <div className="bg-white rounded-lg shadow-md p-6">
          <Services partnerId={partnerDetails.id} />
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
