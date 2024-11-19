import React, { useState, useEffect } from 'react';

const WorkPlace = () => {
  const [partnerData, setPartnerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user_id from local storage
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setError('User ID not found in local storage.');
      setLoading(false);
      return;
    }

    // Fetch partner details from API
    const fetchPartnerDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/partner/partner-detail/?user_id=${userId}`);
        
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 shadow-xl rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Partner Workplace Overview</h2>

      {partnerData ? (
        <div className="grid grid-cols-1 gap-8">
        {/* Business Details Section */}
        <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Business Details</h3>
          <div className="space-y-4">
            {/* Business Name */}
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-700 w-36">Business Name:</span>
              <p className="text-lg text-gray-900">{partnerData.business_name}</p>
            </div>
      
            {/* Website */}
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-700 w-36">Website:</span>
              <a
                href={partnerData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-lg"
              >
                {partnerData.website}
              </a>
            </div>
      
            {/* Address */}
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-700 w-36">Address:</span>
              <p className="text-lg text-gray-900">{partnerData.address}</p>
            </div>
      
            {/* Phone */}
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-700 w-36">Phone:</span>
              <p className="text-lg text-gray-900">{partnerData.phone}</p>
            </div>
      
            {/* Team Size */}
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-700 w-36">Team Size:</span>
              <p className="text-lg text-gray-900">{partnerData.team_size}</p>
            </div>
      
            {/* Additional Information (Optional) */}
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-700 w-36">Business Type:</span>
              <p className="text-lg text-gray-900">{partnerData.business_type || 'N/A'}</p>
            </div>
      
            {/* Social Media */}
            {partnerData.social_media && (
              <div className="space-y-2">
                <p className="text-gray-700"><span className="font-medium">Social Media:</span></p>
                <div className="flex space-x-4">
                  {partnerData.social_media.facebook && (
                    <a href={partnerData.social_media.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Facebook
                    </a>
                  )}
                  {partnerData.social_media.instagram && (
                    <a href={partnerData.social_media.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Instagram
                    </a>
                  )}
                  {partnerData.social_media.twitter && (
                    <a href={partnerData.social_media.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Twitter
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      

          {/* Selected Services Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Selected Services</h3>
            {partnerData.selected_services.length > 0 ? (
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {partnerData.selected_services.map(service => (
                  <li key={service.id} className="flex items-start bg-gray-50 p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <img src={service.image} alt={service.name} className="w-20 h-20 rounded-md object-cover mr-4 shadow-sm" />
                    <div className="flex flex-col justify-between">
                      <p className="font-semibold text-gray-900">{service.name}</p>

                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No services selected.</p>
            )}
          </div>

          {/* License Certificate Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">License Certificate</h3>
            {partnerData.license_certificate_image ? (
              <div className="mt-4">
                <img
                  src={`http://127.0.0.1:8000/media/${partnerData.license_certificate_image}`}
                  alt="License Certificate"
                  className="w-full h-auto rounded-lg shadow-md transition-transform transform hover:scale-105"
                />
              </div>
            ) : (
              <p className="text-sm text-gray-500">No license certificate available.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-gray-600">No data available.</div>
      )}
    </div>
  );
};

export default WorkPlace;
