import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    // Fetch banners from the backend
    const fetchBanners = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/core/banners');
        setBanners(response.data);
      } catch (error) {
        console.error('Error fetching banners', error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="banner-container">
      {banners.length > 0 ? (
        banners.map((banner) => (
          <div key={banner.id} className="banner-item">
            {/* Ensure correct image path (if served through the correct static URL) */}
            <img
              src={`http://localhost:8000${banner.image}`} 
              alt={banner.title} 
              className="banner-image" 
            />
            {/* <div className="banner-content">
              <h2>{banner.title}</h2>
              <p>{banner.description}</p>
            </div> */}
          </div>
        ))
      ) : (
        <p>No active banners at the moment.</p>
      )}
    </div>
  );
};

export default Banner;
