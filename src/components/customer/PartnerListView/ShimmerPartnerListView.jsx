import React from "react";

const ShimmerPartnerListView = () => {
  return (
    <div className="container mx-auto px-8 py-1">
      <h2 className="text-2xl font-bold text-start text-gray-800 mb-4"></h2>
      <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden w-80 h-80 animate-pulse"
            >
              {/* Image Section */}
              <div className="relative h-48 bg-gray-300"></div>

              {/* Card Details */}
              <div className="p- space-y-2">
                <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                <div className="w-1/3 h-4 bg-gray-300 rounded"></div>

                {/* Services Section */}
                <div className="flex flex-wrap mt-3 gap-2">
                  <div className="w-14 h-5 bg-gray-300 rounded"></div>
                  <div className="w-14 h-5 bg-gray-300 rounded"></div>
                  <div className="w-14 h-5 bg-gray-300 rounded"></div>
                </div>
              </div>

              {/* Decorative Border */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-300"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShimmerPartnerListView;
