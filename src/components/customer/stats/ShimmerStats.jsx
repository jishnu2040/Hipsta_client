import React from "react";

const ShimmerStats = () => (
  <div className="animate-pulse grid grid-cols-2 md:grid-cols-4 gap-4">
    {Array(4)
      .fill("")
      .map((_, index) => (
        <div key={index} className="bg-gray-300 h-20 w-full rounded-md"></div>
      ))}
  </div>
);

export default ShimmerStats;
