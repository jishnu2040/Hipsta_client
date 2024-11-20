import React, { useEffect, useState } from "react";
import axios from "axios";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch services when the component is mounted
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/core/services/list/");
        setServices(response.data); // Set the fetched services data
        setLoading(false); // Set loading state to false
      } catch (err) {
        setError("Failed to load services."); // Handle error
        setLoading(false); // Set loading state to false
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>{error}</div>; // Show error message if the request fails
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Services</h2>
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {services.map((service) => (
            <div
              key={service.id}
              className="min-w-[250px] max-w-[250px] border p-3 rounded-lg shadow-md bg-white"
            >
              <h3 className="text-md font-semibold">{service.name}</h3>
              <p className="text-sm text-gray-500">{service.description}</p>
              <p className="mt-2 text-sm font-semibold">Price: {service.price}</p>
              <p className="text-xs">Duration: {service.duration}</p>
              <p className="text-xs text-blue-600 mt-2 font-medium">
                Partner: {service.partner || "Unknown Partner"}
              </p>
              {service.image && (
                <img
                  src={service.image}
                  alt={service.name}
                  className="mt-3 w-full h-32 object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
        {/* Pointers */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button
            className="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300"
            onClick={() => {
              document.querySelector(".overflow-x-auto").scrollBy({
                left: -250,
                behavior: "smooth",
              });
            }}
          >
            &#8592;
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button
            className="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300"
            onClick={() => {
              document.querySelector(".overflow-x-auto").scrollBy({
                left: 250,
                behavior: "smooth",
              });
            }}
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
