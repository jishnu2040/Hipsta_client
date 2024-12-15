import React from 'react';

const Card = ({ children }) => {
  return (
    <div className="bg-white p-2  flex mx-auto max-w-md">
      {children}
    </div>
  );
};

export default Card;
