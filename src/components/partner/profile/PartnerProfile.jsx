import React, { useState, useEffect } from "react";
import axios from "axios"; 
import avatarImage from '../../../assets/man.png';

const PartnerProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    console.log("User ID:", userId);

    // Get the access token directly from localStorage
    const token = localStorage.getItem('access_token'); 

    if (userId && token) {
      axios.get(`http://localhost:8000/api/v1/auth/profile/${userId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((response) => {
          setProfileData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        })
        .finally(() => {
          setLoading(false); // Set loading to false after data is fetched
        });
    } else {
      console.error("User ID or Token not found in localStorage.");
      setLoading(false); // Stop loading if userId or token is missing
    }
  }, []);

  useEffect(() => {
    if (profileData.full_name) {
      document.title = `${profileData.full_name}'s Profile`; // Dynamic title
    }
  }, [profileData]);

  // Helper function to format date and remove time
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format to MM/DD/YYYY
  };

  // If loading, show loader
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-white rounded-xl shadow-lg max-w-4xl border border-gray-200">
      {/* Profile Header Section */}
      <div className="flex items-center justify-start mb-8">
        <div className="flex items-center space-x-6">
          <img
            src={avatarImage}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg"
          />
          <div>
            <h2 className="text-4xl font-semibold text-gray-800">{profileData.full_name || "N/A"}</h2>
            <p className="text-sm text-gray-600">{profileData.email}</p>
          </div>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-medium text-gray-700">Full Name</h3>
          <p className="text-lg text-gray-600">{profileData.full_name || "N/A"}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-gray-700">Email</h3>
          <p className="text-lg text-gray-600">{profileData.email || "N/A"}</p>
        </div>
        <div>
          <h3 className="text-xl font-medium text-gray-700">Date Joined</h3>
          <p className="text-lg text-gray-600">{formatDate(profileData.date_joined)}</p>
        </div>
      </div>

      {/* Edit Button */}
      <div className="flex justify-end mt-8">
        <button className="px-6 py-3 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-md">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default PartnerProfile;