import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PartnerListView = ({ location }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const S3_BASE_URL = "https://hipsta-s3.s3.ap-south-1.amazonaws.com/";

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        let url = "http://localhost:8000/api/v1/customer/partners/";
        if (location?.lat && location?.lng) {
          url += `?lat=${location.lat}&lng=${location.lng}`;
        }
        const response = await axios.get(url);
        setPartners(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load partners. Please try again later.");
        setLoading(false);
      }
    };

    fetchPartners();
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
    <div className="container mx-auto px-10 py-1">
      <h2 className="text-2xl font-bold text-start  text-gray-800 mb-4">Nearest Partners</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map((partner) => (
          <Link to={`/detaildPage/${partner.id}`} key={partner.id}>
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out group">
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                {partner.image_slides?.length > 0 ? (
                  <img
                    src={`${S3_BASE_URL}${partner.image_slides[0]?.image_url}`}
                    alt="Partner Slide"
                    className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}
              </div>

              {/* Card Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {partner.business_name || "No Business Name"}
                </h3>
                <p className="text-sm text-gray-600 truncate">{partner.address || "No Address"}</p>
                <p className="text-sm text-gray-500 mt-2">Team Size: {partner.team_size || "N/A"}</p>

                {/* Services Section */}
                <div className="flex flex-wrap mt-3 gap-2">
                  {partner.selected_services?.length > 0 ? (
                    partner.selected_services.map((serviceId) => (
                      <span
                        key={serviceId}
                        className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-medium"
                      >
                        Service {serviceId} {/* Replace with service name if available */}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 text-xs">No services available</span>
                  )}
                </div>
              </div>

              {/* Decorative Border */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PartnerListView;
