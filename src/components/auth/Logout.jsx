import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router
import { toast } from "react-toastify"; // For showing notifications
import axiosInstance from "../../utlils/axiosinstance";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const refreshToken = localStorage.getItem("refresh");

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
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("user");
          navigate("/");
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

    handleLogout();
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
