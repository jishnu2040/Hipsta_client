import React from 'react';

const ShimmerPartnerDetail = () => {
  return (
    <div className="grid grid-cols-12 gap-2 animate-pulse">
      {/* Left Side */}
      <div className="col-span-8 md:col-span-8 space-y-6">
        {/* Title and Address Shimmer */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-3/4 h-8 bg-gray-300 rounded-md"></div>
        </div>

        {/* Image Shimmer */}
        <div className="w-4/5 h-96 bg-gray-300 rounded-md"></div>

        {/* Services Section Shimmer */}
        <div className="w-full h-20 bg-gray-300 rounded-md"></div>
      </div>

      {/* Right Side as Card */}
      <div className="col-span-4 md:col-span-4 space-y-8 mt-6 p-6 bg-gray-200 shadow-lg rounded-lg w-full" >
        <div className="w-full h-8 bg-gray-300 rounded-md"></div>
        <div className="w-full h-6 bg-gray-300 rounded-md"></div>
        <div className="w-full h-6 bg-gray-300 rounded-md"></div>
        <div className="w-full h-6 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default ShimmerPartnerDetail;
