import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const PartnerCard = ({ partner, S3_BASE_URL }) => (
  <Link to={`/detaildPage/${partner.id}`}>
    <div className="bg-white rounded-xl shadow overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out group">
      <div className="relative h-48 md:h-56 overflow-hidden">
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
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {partner.business_name || "No Business Name"}
        </h3>
        <p className="text-sm text-gray-600 truncate">
          {partner.address || "No Address"}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Team Size: {partner.team_size || "N/A"}
        </p>
        <div className="flex flex-wrap mt-3 gap-2">
          {partner.selected_services?.length > 0 ? (
            partner.selected_services.map((serviceId) => (
              <span
                key={serviceId}
                className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-xs font-medium"
              >
                Service {serviceId}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-xs">No services available</span>
          )}
        </div>
      </div>
    </div>
  </Link>
);

const PartnerListView = ({ location }) => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const S3_BASE_URL = "https://hipsta-s3.s3.ap-south-1.amazonaws.com/";

  const fetchPartners = async () => {
    try {
      setLoading(true);
      const url = "http://localhost:8000/api/v1/customer/partners/";
      const response = await axios.get(url);
      setPartners(response.data.results);
      setLoading(false);
    } catch (error) {
      setError("Failed to load partners. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  if (error) {
    return <div className="text-center text-red-500 font-semibold">{error}</div>;
  }

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (!partners.length) {
    return <div className="text-center text-gray-500">No partners found.</div>;
  }

  // Slider settings for react-slick
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // For tablets and smaller screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // For mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-start text-gray-800 mb-6">
        Nearest Partners
      </h2>

      {/* Slider for all screen sizes */}
      <Slider {...sliderSettings}>
        {partners.map((partner) => (
          <div key={partner.id} className="p-2">
            <PartnerCard partner={partner} S3_BASE_URL={S3_BASE_URL} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PartnerListView;
