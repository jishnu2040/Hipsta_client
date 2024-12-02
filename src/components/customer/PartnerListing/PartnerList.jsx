import React from 'react';
import ServiceTypes from '../Service_list/ServiceTypes';

const PartnerList = ({ partners }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Ad Section */}
      <div className="p-4 bg-yellow-100 text-center rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Special Offer: 50% off on all services!</h3>
      </div>

      {/* Partners Listing */}
      <div className="grid grid-cols-12 w-full max-w-7xl mx-auto gap-2 p-2">
      <div className="col-span-12 md:col-span-3 shadow-lg p-2 max-h-min rounded-lg overflow-y-auto bg-gray-50">    
        <ServiceTypes small />
      </div>

      {/* Partners */}
      <div className="col-span-12 md:col-span-8 bg-white p-4 rounded-lg overflow-y-auto">
        {partners.length === 0 ? (
          <p className="text-gray-500">No partners available for this service.</p>
        ) : (
          <div className="space-y-6">
            {partners.map((partner) => (
              <div key={partner.id} className="border-b pb-4">
                <h3 className="text-xl font-semibold">{partner.business_name}</h3>
                <p className="text-gray-600">{partner.address}</p>
                <p className="text-gray-600">Phone: {partner.phone}</p>
            
                
                {/* Displaying service type image and name */}
                <div className="mt-2">
                  <h4 className="text-lg font-semibold">Services Offered:</h4>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default PartnerList;
