import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex mx-auto max-w-md">
      {children}
    </div>
  );
};

export default Card;
