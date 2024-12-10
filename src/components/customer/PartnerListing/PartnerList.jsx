import React from 'react';
import { Link } from 'react-router-dom';
import ServiceTypes from '../Service_list/ServiceTypes';
import Map from '../map/Map';

const PartnerList = ({ partners }) => {
  return (
    <div className="flex flex-col">
      {/* Ad Section */}
      <div className="p-3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-center rounded-lg  mb-3">
        <h3 className="text-xl font-semibold text-white">Special Offer: 50% off on all services!</h3>
      </div>

      {/* Partners Listing */}
      <div className="grid grid-cols-12 w-full max-w-7xl mx-auto gap-6">
        {/* Left Sidebar: Service Types */}
        <div className="col-span-12 md:col-span-3 bg-white shadow-lg rounded-lg overflow-hidden sticky top-24">
          <ServiceTypes small />
        </div>

      {/* Partners List Section (Scrollable) */}
<div className="col-span-12 md:col-span-5 bg-white p-6 rounded-xl shadow-lg transition-all hover:shadow-2xl max-h-[80vh] overflow-y-auto hide-scrollbar">
  {partners.length === 0 ? (
    <p className="text-gray-500 text-center text-xl font-medium">No partners available for this service.</p>
  ) : (
    <div className="space-y-6">
      {partners.map((partner) => (
        <Link to={`/detaildPage/${partner.id}`} key={partner.id}>
          <div className="border-b pb-6 hover:bg-gray-50 transition-all duration-300 rounded-lg hover:scale-105 transform">
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">{partner.business_name}</h3>
              <p className="text-gray-600 mt-2 text-lg flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-accent"></i>
                {partner.address}
              </p>
              <p className="text-gray-600 text-lg flex items-center gap-2">
                <i className="fas fa-phone-alt text-accent"></i>
                Phone: {partner.phone}
              </p>

              {/* Services Offered */}
              <div className="mt-4 flex flex-wrap gap-4">
                {partner.service_names.map((service, index) => (
                  <span
                    key={index}
                    className="px-5 py-2 bg-gray-800 text-white rounded-full text-sm font-medium shadow-md transform hover:scale-110 hover:bg-indigo-700 transition-all duration-200"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )}
</div>

        {/* Right Section: Map */}
        <div className="col-span-12 md:col-span-4 lg:col-span-4 bg-gray-50 rounded-lg shadow-md sticky top-24">
          <Map partners={partners} />
        </div>
      </div>
    </div>
  );
};

export default PartnerList;
