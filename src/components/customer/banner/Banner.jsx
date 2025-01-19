import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

  useEffect(() => {
    // Fetch banners from the backend
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}core/banners/`); 
        setBanners(response.data.filter((banner) => banner.is_active));
      } catch (error) {
        console.error('Error fetching banners', error);
      }
    };

    fetchBanners();
  }, [API_BASE_URL]);

  useEffect(() => {
    // Auto-slide the banners every 3 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [banners]);

  if (banners.length === 0) {
    return <p className="text-center mt-4">No active banners at the moment.</p>;
  }

  return (
    <div className="banner-container mt-6 relative overflow-hidden w-full h-56 sm:h-48 md:h-64 lg:h-72">
      {/* Slider */}
      <div
        className="banner-slider flex transition-transform duration-500"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="banner-item w-full flex-shrink-0">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-scale-down rounded-xl"
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="dots absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
