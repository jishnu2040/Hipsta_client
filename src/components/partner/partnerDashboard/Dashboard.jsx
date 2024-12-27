import React, { useContext, useEffect } from "react";
import axios from "axios";
import ThemeContext from "../../../ThemeContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchPartnerId = async () => {
      const userId = localStorage.getItem("userId"); // Assuming userId is already stored
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
        localStorage.setItem("partnerId", partnerId); // Store partnerId in local storage

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
      className={`p-6 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      {/* Your Dashboard content here */}
    </div>
  );
};

export default Dashboard;
