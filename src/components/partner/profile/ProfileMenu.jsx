import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate for redirect
import { FaUser, FaBuilding, FaCog, FaSignOutAlt } from 'react-icons/fa'; 
import { toast } from 'react-toastify';
import axiosInstance from '../../../utlils/axiosinstance';

const ProfileMenu = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      toast.error("No refresh token found");
      navigate("/login");
      return;
    }

    try {
      // Call the backend logout API
      const res = await axiosInstance.post("/auth/logout/", { refresh_token: refreshToken });

      if (res.status === 204) {
        // Clear local storage on successful logout
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        localStorage.removeItem("userId")
        navigate("/"); // Redirect to homepage or login page
        toast.success("Logout successful");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // Handle token expiration
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        navigate("/login");
        toast.info("Session expired. Logged out.");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    }
  };

  const data = [
    { title: 'My Profile', link: '/partner/profile', icon: <FaUser /> },
    { title: 'Workplace', link: '/partner/profile/workplace', icon: <FaBuilding /> },
    { title: 'Settings', link: '#', icon: <FaCog /> }, 
    { title: 'Logout', link: '#', icon: <FaSignOutAlt />, action: handleLogout } 
  ]

  return (
    <div className="w-full h-full flex flex-col justify-center rounded-lg shadow-md p-4">
      {/* Heading */}
      <div className="mt-32">
        <h2 className="text-lg font-bold text-gray-600">Your Account</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow space-y-2 p-4">
        {data.map((item) => (
          <div key={item.title} className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition duration-200 ease-in-out">
            <span className="mr-2">{item.icon}</span>
            {item.link === '#' ? (
              // If it's the logout button, trigger the action
              <button
                onClick={item.action}
                className="text-base font-medium w-full text-left"
              >
                {item.title}
              </button>
            ) : (
              // Regular link
              <Link
                to={item.link}
                className="text-base font-medium w-full text-left"
              >
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default ProfileMenu;
