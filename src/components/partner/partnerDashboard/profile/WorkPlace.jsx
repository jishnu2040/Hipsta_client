import React, { useState, useEffect } from 'react';
import UploadShopImage from './UploadShopImage';

const WorkPlace = () => {
  const [partnerData, setPartnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL 

  const partnerId = localStorage.getItem('partnerId');

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setError('User ID not found in local storage.');
      setLoading(false);
      return;
    }

    const fetchPartnerDetails = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}partner/partner-detail/?user_id=${userId}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch partner details');
        }

        const data = await response.json();
        setPartnerData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerDetails();
  }, []);

  const renderSocialMediaLinks = (socialMedia) => (
    <div className="flex flex-wrap gap-2">
      {socialMedia.facebook && (
        <a
          href={socialMedia.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Facebook
        </a>
      )}
      {socialMedia.instagram && (
        <a
          href={socialMedia.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:underline"
        >
          Instagram
        </a>
      )}
      {socialMedia.twitter && (
        <a
          href={socialMedia.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline"
        >
          Twitter
        </a>
      )}
    </div>
  );

  const renderLoader = () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );

  const renderError = () => (
    <div className="flex justify-center items-center min-h-screen text-red-500">
      Error: {error}
    </div>
  );

  const renderBusinessDetails = () => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Business Details</h3>
      <div className="space-y-4 text-sm sm:text-base">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <span className="font-medium text-gray-700 w-36">Business Name:</span>
          <p className="text-gray-900">{partnerData.business_name}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <span className="font-medium text-gray-700 w-36">Website:</span>
          <a
            href={partnerData.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {partnerData.website}
          </a>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <span className="font-medium text-gray-700 w-36">Address:</span>
          <p className="text-gray-900">{partnerData.address}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <span className="font-medium text-gray-700 w-36">Phone:</span>
          <p className="text-gray-900">{partnerData.phone}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <span className="font-medium text-gray-700 w-36">Team Size:</span>
          <p className="text-gray-900">{partnerData.team_size}</p>
        </div>
        {partnerData.social_media && renderSocialMediaLinks(partnerData.social_media)}
      </div>
    </div>
  );

  const renderSelectedServices = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Selected Services</h3>
      {partnerData.selected_services.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerData.selected_services.map((service) => (
            <li
              key={service.id}
              className="flex items-start bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <img
                src={service.image_url}
                alt={service.name}
                className="w-16 h-16 rounded-md object-cover mr-4"
              />
              <div>
                <p className="font-semibold text-gray-900">{service.name}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No services selected.</p>
      )}
    </div>
  );

  const renderLicenseCertificate = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">License Certificate</h3>
      <div>
        {partnerData.license_certificate_image ? (
          <img
            src={`https://hipsta-s3.s3.ap-south-1.amazonaws.com/${partnerData.license_certificate_image}`}
            alt="License Certificate"
            className="rounded-lg shadow-md transition-transform transform hover:scale-105 w-full max-w-md mx-auto"
          />
        ) : (
          <p className="text-sm text-gray-500">No license certificate available.</p>
        )}
      </div>
    </div>
  );

  if (loading) return renderLoader();
  if (error) return renderError();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-gray-50 shadow-xl rounded-lg mt-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
        Partner Workplace Overview
      </h2>
      {partnerData ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {renderBusinessDetails()}
          {renderSelectedServices()}
          {renderLicenseCertificate()}
          <UploadShopImage partnerId={partnerId} />
        </div>
      ) : (
        <div className="text-gray-600">No data available.</div>
      )}
    </div>
  );
};

export default WorkPlace;
