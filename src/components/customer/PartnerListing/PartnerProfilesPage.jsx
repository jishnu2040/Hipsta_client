import React from 'react';

const PartnerProfilesPage = ({ partners, services }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Ad Section */}
      <div className="p-4 bg-yellow-100 text-center rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Special Offer: 50% off on all services!</h3>
      </div>

      {/* Partners Listing */}
      <div className="grid grid-cols-12 w-full max-w-7xl mx-auto gap-4 p-2">
        <div className="col-span-12 md:col-span-4 shadow-lg p-4 rounded-lg overflow-y-auto bg-gray-50">
          <h2 className="text-xl font-medium mb-4">Services</h2>
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.id} className="text-gray-700 font-medium">
                <div className="flex items-center">
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-8 h-8 object-contain mr-2"
                    />
                  )}
                  {service.name}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Partners */}
        <div className="col-span-12 md:col-span-8 bg-white p-4 rounded-lg overflow-y-auto">
          <h2 className="font-bold text-lg mb-4">Partners</h2>
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
                    <ul>
                      {partner.selected_services.map((serviceId) => {
                        const service = services.find((service) => service.id === serviceId);
                        return service ? (
                          <li key={service.id} className="flex items-center text-gray-700">
                            {service.image && (
                              <img
                                src={service.image}
                                alt={service.name}
                                className="w-6 h-6 object-contain mr-2"
                              />
                            )}
                            {service.name}
                          </li>
                        ) : null;
                      })}
                    </ul>
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

export default PartnerProfilesPage;
