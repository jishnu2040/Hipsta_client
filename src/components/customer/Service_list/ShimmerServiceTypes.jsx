import React from "react";

const ShimmerServiceTypes = () => (
  <div className="animate-pulse grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array(8)
      .fill("")
      .map((_, index) => (
        <div key={index} className="bg-gray-300 h-24 w-full rounded-md"></div>
      ))}
  </div>
);

export default ShimmerServiceTypes;
