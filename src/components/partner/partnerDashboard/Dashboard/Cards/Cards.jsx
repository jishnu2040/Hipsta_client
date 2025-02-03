import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ThemeContext from "../../../../../ThemeContext";

const Cards = () => {
  const [cardData, setCardData] = useState([
    {
      title: "Total Bookings",
      value: "-",
      icon: "📅",
      bgColor: "bg-gray-700",
    },
    {
      title: "Total Services",
      value: "-",
      icon: "🛠️",
      bgColor: "bg-gray-700",
    },
    {
      title: "Employee Count",
      value: "-",
      icon: "👥",
      bgColor: "bg-gray-700",
    },
  ]);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const partnerId = localStorage.getItem("partnerId"); // Fetch partnerId from local storage

  const { isDarkMode } = useContext(ThemeContext); // Access the theme context

  useEffect(() => {
    if (partnerId) {
      // Make an API call to fetch partner stats
      axios
        .get(`${API_BASE_URL}partner/${partnerId}/stats/`)
        .then((response) => {
          // Update the state with the API response
          setCardData([
            {
              title: "Total Bookings",
              value: response.data.total_bookings,
              icon: "📅",
              bgColor: "bg-gray-700",
            },
            {
              title: "Total Services",
              value: response.data.total_services,
              icon: "🛠️",
              bgColor: "bg-gray-700",
            },
            {
              title: "Employee Count",
              value: response.data.employee_count,
              icon: "👥",
              bgColor: "bg-gray-700",
            },
          ]);
        })
        .catch((error) => {
          console.error("Error fetching partner stats:", error);
        });
    } else {
      console.error("Partner ID not found in local storage");
    }
  }, [partnerId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`flex items-center p-6 rounded-lg ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
          }`}
        >
          <div className="text-4xl mr-4">{card.icon}</div>
          <div>
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
