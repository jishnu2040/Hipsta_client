import React, { useState, useEffect } from 'react';
import PartnerAvailability from './PartnerAvailability';
import Services from './Services';
import ShimmerPartnerDetail from '../../../Pages/customer/partnerPage/ShimmerPartnerDetail';

const PartnerDetails = ({ partnerDetails }) => {
  const S3_BASE_URL = 'https://hipsta-s3.s3.ap-south-1.amazonaws.com/';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a 2-second delay for loading state
    const timer = setTimeout(() => {
      if (partnerDetails) {
        setLoading(false); // Set loading to false after 2 seconds
      }
    }, 2000); // 2000ms = 2 seconds

    // Cleanup the timer when the component is unmounted or partnerDetails changes
    return () => clearTimeout(timer);
  }, [partnerDetails]);

  // Return the ShimmerLoader when loading
  if (loading) {
    return <ShimmerPartnerDetail />;
  }

  return (
    <div className="grid grid-cols-12 gap-8 lg:mx-8 py-">
      <div className="col-span-12 md:col-span-8 space-y-6 mt-4">
        <div className="mb- flex flex-col md:flex-row gap-6">
          <h1 className="text-4xl font-semibold text-gray-900">{partnerDetails.business_name}</h1>
          <p className="text-gray-600 text-xl mt-2 md:mt-0">{partnerDetails.address}</p>
        </div>

        <div className="rounded-lg overflow-hidden p-2">
          <img
            src={`${S3_BASE_URL}${partnerDetails.image_slides[0]?.image_url}`}
            alt="Shop Image"
            className="w-11/12  object-cover rounded-md"
          />
        </div>

        {/* Services Section */}
        <div>
          <div className="bg-white p-2">
            <Services partnerId={partnerDetails.id} />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-span-12 md:col-span-4 sticky top-4 mt-20 self-start space-y-2">
        <div className="bg-gray-100 rounded-md p-4 shadow-md">
          <h1 className="text-2xl font-semibold text-gray-900">{partnerDetails.business_name}</h1>
          <p className="text-gray-800 text-xl mt-2 md:mt-0">{partnerDetails.address}</p>
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
        <div>
          <PartnerAvailability partnerId={partnerDetails.id} />
        </div>
      </div>
    </div>
  );
};

export default PartnerDetails;
