import React from 'react';
import { Link } from 'react-router-dom';
import ServiceTypes from '../Service_list/ServiceTypes';
import Map from '../map/Map';

const PartnerList = ({ partners }) => {
  const S3_BASE_URL = "https://hipsta-s3.s3.ap-south-1.amazonaws.com/";

  return (
    <div className="flex flex-col">
      {/* Ad Section */}
      <div className="p-3 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 text-center mb-3 ">
        <h3 className="text-xl font-semibold text-white">
          Special Offer: 50% off on all services!
        </h3>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 w-full max-w-7xl mx-auto gap-4">
        {/* Left Sidebar */}
        <div className="col-span-12 md:col-span-3">
          {/* Service Types Container */}
          <div className="border border-gray-300 rounded-lg bg-white overflow-hidden sticky top-24 shadow-sm mb-6">
            <ServiceTypes small />
          </div>

          {/* UC Promise Section */}
          <div className="border border-gray-300 rounded-lg bg-white overflow-hidden sticky top-24 shadow-md">
            <div className="p-4">
              <h1 className="text-xl font-semibold text-gray-800 mb-4">
                Hipsta Promise
              </h1>
              <ul className="list-none pl-5 space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">&#10003;</span>
                  Verified Professionals
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">&#10003;</span>
                  Hassle-Free Booking
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">&#10003;</span>
                  Transparent Pricing
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Partner List Section */}
        <div className="col-span-12 md:col-span-5 border border-gray-200 rounded-lg bg-white p-6 max-h-[80vh] overflow-y-auto hide-scrollbar shadow-lg transition-transform transform hover:scale-105">
          {partners.length === 0 ? (
            <p className="text-gray-500 text-center text-xl font-medium">
              No partners available for this service.
            </p>
          ) : (
            <div className="space-y-8">
              {partners.map((partner) => (
                <Link to={`/detaildPage/${partner.id}`} key={partner.id}>
                  <div className="border-b pb-6 hover:bg-gray-50 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg transform hover:scale-102">
                    <div className="flex flex-col gap-6">
                      <h3 className="text-3xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
                        {partner.business_name}
                      </h3>

                      <div className="relative h-48 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                        {partner.image_slides && partner.image_slides.length > 0 ? (
                          <img
                            src={`${S3_BASE_URL}${partner.image_slides[0]?.image_url}`}
                            alt={`${partner.business_name} Shop`}
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg shadow-inner">
                            <span className="text-gray-500 text-lg">No Image Available</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <p className="text-gray-600 text-lg flex items-center gap-2">
                          <i className="fas fa-map-marker-alt text-accent"></i>
                          {partner.address}
                        </p>
                        <p className="text-gray-600 text-lg flex items-center gap-2">
                          <i className="fas fa-users text-accent"></i>
                          Team Size: {partner.team_size}
                        </p>
                      </div>

                      {/* Top Services Section */}
                      <div className="mt-4">
                        <h4 className="text-lg font-medium text-gray-800">Top Services:</h4>
                        <ul className="mt-2 space-y-2">
                          {partner.top_services.map((service, index) => (
                            <li
                              key={index}
                              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm text-gray-700"
                            >
                              <span>{service.name}</span>
                              <span className="text-sm text-gray-500">
                                {service.duration} • {service.price}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Services Offered */}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {partner.service_names.map((service, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 ml-8 bg-gray-600 text-white rounded-md text-sm font-medium shadow-md transform hover:scale-110 hover:bg-indigo-700 transition-all duration-200"
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

        {/* Map Section */}
        <div className="col-span-12 md:col-span-4 lg:col-span-4 bg-gray-50 rounded-lg sticky top-24 shadow-sm">
          <Map partners={partners} />
        </div>
      </div>
    </div>
  );
};

export default PartnerList;
