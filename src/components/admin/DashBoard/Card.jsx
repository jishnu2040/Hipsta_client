// Card.js
import React from 'react';

const Card = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
      <div className="flex items-center">
        <div className="bg-blue-500 p-3 rounded-full text-white mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-gray-600 text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
