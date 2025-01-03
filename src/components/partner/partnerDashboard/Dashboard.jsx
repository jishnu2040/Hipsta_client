import React, { useContext, useEffect } from "react";
import axios from "axios";
import ThemeContext from "../../../ThemeContext";
import { useNavigate } from "react-router-dom";
import Chart from "./Chart/Chart";
import BarChartComponent from "./Chart/BarChartComponent";
// import RealTimeChart from "./Chart/RealTimeChart";
import NextAppointment from "./analytics/NextAppointment";

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

  useEffect(() => {
    const partnerId = 'b2456763-8e2e-4144-b354-ea80bfdc1530'; // Replace with actual partner ID

    const socket = new WebSocket(
      `ws://localhost:8000/ws/notifications/${partnerId}/`
    );

    socket.onopen = () => {
      console.log("Connected to WebSocket server.");
    //   socket.send(JSON.stringify({
    //     message: "New appointment booked!"
    // }));
    };

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("Received message:", data.message);
      // Handle the received message (e.g., show a notification)
    };

    socket.onerror = (e) => {
      console.log("WebSocket error:", e);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    // Cleanup WebSocket connection when component unmounts
    return () => {
      socket.close();
    };
  }, []);
  

  return (
    <div
      className={`p-6 min-h-screen ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <div className=" gap-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
      <BarChartComponent />
      <NextAppointment />
      </div>
      <Chart />
    </div>
    </div>
  );
};

export default Dashboard;
