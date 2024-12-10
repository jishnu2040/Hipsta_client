import React from "react";

const ShimmerPartnerCard = () => {
  return (
    <div className="animate-pulse flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Image Placeholder */}
      <div className="bg-gray-300 h-32 rounded-md"></div>
      
      {/* Title Placeholder */}
      <div className="bg-gray-300 h-6 w-3/4 rounded-md"></div>
      
      {/* Subtitle Placeholder */}
      <div className="bg-gray-300 h-4 w-1/2 rounded-md"></div>
    </div>
  );
};

export default ShimmerPartnerCard;
