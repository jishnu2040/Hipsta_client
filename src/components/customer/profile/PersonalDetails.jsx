import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utlils/axiosinstance";
import avatarImage from "../../../assets/man.png";

const PersonalDetails = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('access_token'); 
    console.log(userId, token);
    

    if (userId && token) {
      axiosInstance.get(`/auth/profile/${userId}/`, {
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
          setLoading(false);
        });
    } else {
      console.error("User ID or Token not found in localStorage.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (profileData.full_name) {
      document.title = `${profileData.full_name}'s Profile`;
    }
  }, [profileData]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6   max-w-4xl ">
      {/* Profile Header Section */}
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={avatarImage}
          alt="User Avatar"
          className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-lg transform hover:scale-105 transition duration-300"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{profileData.full_name || "N/A"}</h2>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">Full Name</h3>
          <p className="text-gray-600 mt-2">{profileData.full_name || "N/A"}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">Email</h3>
          <p className="text-gray-600 mt-2">{profileData.email || "N/A"}</p>
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-medium text-gray-700">Date Joined</h3>
          <p className="text-gray-600 mt-2">{formatDate(profileData.date_joined)}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;