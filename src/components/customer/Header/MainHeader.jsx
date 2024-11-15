import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../../assets/hipsta-high-resolution-logo-transparent.png';
import axiosInstance from '../../../utlils/axiosinstance';
import { toast } from 'react-toastify';

// Utility function to safely get items from localStorage
const getItemFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error parsing ${key}:`, error);
    return null;
  }
};

function MainHeader() {
  const navigate = useNavigate();
  const user = getItemFromLocalStorage('user');
  const refresh = getItemFromLocalStorage('refresh');

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout/", { refresh_token: refresh });

      if (res.status === 200) {
        // Clear local storage on successful logout
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        navigate('/');
        toast.success("Logout successful");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        // Handle token expiration
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        navigate('/login');
        toast.info("Session expired. Logged out.");
      } else {
        toast.error("Logout failed. Please try again.");
      }
    }
  };

  const handleProfile = async () => {
    try {
      const resp = await axiosInstance.get("/auth/profile/");
      if (resp.status === 200) {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error("Failed to fetch profile");
    }
  };

  return (
    <header className="bg-background max-h-24 p-3 border-b-2 mx-2 md:mx-6 lg:mx-8">
      <div className="flex items-center justify-between h-full mx-6 md:mx-8 lg:mx-16 xl:mx-32 py-4">
        <div className="flex items-center">
          <img src={img} alt="Logo" className="h-10" />
        </div>
        <div className="flex space-x-4">
          {user ? (
            <>
              <p className="text-black font-bold hidden md:block">{user?.name}</p>
              <button
                onClick={handleProfile}
                className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-blue-600">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
