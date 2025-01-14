import React from "react";

const Cards = () => {
  const cardData = [
    {
      title: "Total Bookings",
      value: "1,234",
      icon: "📅",
      bgColor: "bg-gray-700",
    },
    {
      title: "Total Services",
      value: "56",
      icon: "🛠️",
      bgColor: "bg-gray-700",
    },
    {
      title: "Employee Count",
      value: "12",
      icon: "👥",
      bgColor: "bg-gray-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`flex items-center p-6 rounded-lg  text-white ${card.bgColor}`}
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
