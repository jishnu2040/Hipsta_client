import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartnerListView = ({ location }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("Partner list location", location);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        let url = 'http://localhost:8000/api/v1/partner/partners/';
        if (location?.lat && location?.lng) {
          url += `?lat=${location.lat}&lng=${location.lng}`;
        }
        const response = await axios.get(url);
        setPartners(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load partners. Please try again later.');
        setLoading(false);
      }
    };

    if (location?.lat && location?.lng) {
      fetchPartners();
    }
  }, [location]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-semibold">{error}</div>;
  }

  if (!partners.length) {
    return <div className="text-center text-gray-500">No partners found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Nearest</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map(partner => (
          <div
            key={partner.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6"
          >
            <h3 className="text-2xl font-semibold text-blue-900 mb-2">{partner.business_name || 'No Business Name'}</h3>
            
            {/* Display Location */}
            <p className="text-blue-700 mb-2">{partner.address || 'No Location'}</p>
            
            {/* Display Team Size */}
            <p className="text-gray-700 mb-2">Team Size: {partner.team_size || 'N/A'}</p>

            {/* Display Selected Services */}
            <div className="flex flex-wrap mt-4">
              {partner.selected_services?.length > 0 ? (
                partner.selected_services.map(serviceId => (
                  <span
                    key={serviceId}
                    className="bg-blue-100 text-blue-900 rounded-full px-3 py-1 text-sm mr-2 mb-2"
                  >
                    Service {serviceId} {/* Replace with actual service name if available */}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No services available</span>
              )}
            </div>
            
  
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerListView;
