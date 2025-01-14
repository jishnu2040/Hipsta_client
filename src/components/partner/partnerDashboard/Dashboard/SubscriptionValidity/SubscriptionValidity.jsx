import React from 'react';
import { FaClock } from 'react-icons/fa'; // Importing an icon for the card

const SubscriptionValidity = () => {
  const expirationDate = '2025-06-30'; // Example expiration date
  const subscribeLink = '/partner-subscription'; // Example link to subscription page

  return (
    <div className="bg-gradient-to-r from-red-500 to-red-700 p-6 rounded-lg  text-white flex flex-col items-center justify-center space-y-4  mx-auto">
      {/* Icon */}
      <div className="text-4xl">
        <FaClock />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold">Subscription Validity</h3>

      {/* Expiration Date */}
      <p className="text-sm">
        Your subscription expires on <span className="font-bold">{expirationDate}</span>.
      </p>

      {/* Subscribe Link */}
      <a
        href={subscribeLink}
        className="mt-4 px-6 py-2 bg-white text-red-700 font-semibold rounded-lg hover:bg-gray-100 transition duration-300"
      >
        Subscribe Now
      </a>
    </div>
  );
};

export default SubscriptionValidity;
