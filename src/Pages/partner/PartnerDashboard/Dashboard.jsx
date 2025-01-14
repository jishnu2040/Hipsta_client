import React, { useContext, useEffect } from "react";
import axios from "axios";
import ThemeContext from "../../../ThemeContext";
import { useNavigate } from "react-router-dom";
import Chart from "../../../components/partner/partnerDashboard/Dashboard/Chart/Chart";
import BarChartComponent from "../../../components/partner/partnerDashboard/Dashboard/Chart/BarChartComponent";
import NextAppointment from "../../../components/partner/partnerDashboard/Dashboard/analytics/NextAppointment";
import Cards from "../../../components/partner/partnerDashboard/Dashboard/Cards/Cards";
import SubscriptionValidity from "../../../components/partner/partnerDashboard/Dashboard/SubscriptionValidity/SubscriptionValidity";
import TopEmployees from "../../../components/partner/partnerDashboard/Dashboard/analytics/TopEmployees";
import TopServices from "../../../components/partner/partnerDashboard/Dashboard/analytics/TopServices";
import SchedulerComponent from "./SchedulerComponent";

const Dashboard = () => {

  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  

  useEffect(() => {
    const fetchPartnerId = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in local storage");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/partner/get-partner-id/${userId}/`
        );
        const partnerId = response.data.partner_id;
        const subscription_status = response.data.subscription_status;
        localStorage.setItem("partnerId", partnerId); 

        if (subscription_status === "inactive") {
          navigate("/partner-subscription");
        }
      } catch (error) {
        console.error("Failed to fetch partner ID:", error.response?.data || error.message);
      }
    };

    fetchPartnerId();
  }, []);


  return (
    <div
      className={` min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-600" : "bg-white text-gray-800"
      }`}
    >
      <div className=" gap-6 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
        {/* Cards: 2/3 Width */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6  p-2">
            <Cards />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6  ">
            <Chart />
          </div>
        </div>
        {/* Next Appointment: 1/3 Width */}
        <div className="lg:col-span-1 p-2 ">
          <NextAppointment />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-2">
        <div className="col-span-1 p-2">
          <SubscriptionValidity />
        </div>
        <div className="col-span-2">
          <BarChartComponent />
        </div>
      </div>   
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
        <TopEmployees />
        <TopServices />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
