import React from "react";
import ShimmerSearchBanner from "../../../components/customer/banner/ShimmerSearchBanner"
import ShimmerServiceTypes from "./../../../components/customer/Service_list/ShimmerServiceTypes";
import ShimmerPartnerListView from "../../../components/customer/PartnerListView/ShimmerPartnerListView";
import ShimmerStats from "../../../components/customer/stats/ShimmerStats";

const ShimmerHome = () => (
  <div className="flex flex-col">
    {/* Header Placeholder */}
    <div className="bg-gray-300 h-24 w-full mb-4"></div>

    {/* Search and Banner Placeholder */}
    <div className="mx-6 md:mx-8 lg:mx-16 xl:mx-32 py-8 flex flex-col md:flex-row justify-between">
      <div className="flex-1 mr-4">
        <ShimmerSearchBanner />
      </div>
      <div className="flex-1 mt-10 ml-4">
        <ShimmerServiceTypes />
      </div>
    </div>

    {/* Partner List Placeholder */}
    <div className="px-24">
      <ShimmerPartnerListView />
    </div>

    {/* Stats Placeholder */}
    <div className="px-24 mt-6">
      <ShimmerStats />
    </div>

    {/* Footer Placeholder */}
    <div className="bg-gray-300 h-24 w-full mt-6"></div>
  </div>
);

export default ShimmerHome;
