// src/components/PartnerDashboard/TopServices.js
import React from 'react';

const TopServices = () => {
  const services = [
    { id: 1, name: 'Web Development', description: 'Custom website design and development', rating: 4.8 },
    { id: 2, name: 'App Development', description: 'Mobile application development for Android & iOS', rating: 4.6 },
    { id: 3, name: 'SEO Optimization', description: 'Search Engine Optimization to rank your website', rating: 4.7 },
    { id: 4, name: 'Digital Marketing', description: 'Promoting your brand through digital channels', rating: 4.5 },
  ];

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Top Services</h3>
      <ul>
        {services.map((service) => (
          <li
            key={service.id}
            className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-green-200 rounded-full flex items-center justify-center text-xl font-semibold text-white">
                {service.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-800">{service.name}</p>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </div>
            <span className="text-xl font-semibold text-gray-700">{service.rating}⭐</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopServices;
