import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utlils/axiosinstance'; // Ensure this path is correct
import { toast } from 'react-toastify';

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const refresh = localStorage.getItem('refresh');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = async (event) => {
    event.preventDefault();
    console.log("Logout button clicked"); // Debug log
    if (isLoggingOut) {
      console.log("Logout in progress, preventing multiple clicks"); // Debug log
      return;
    }

    setIsLoggingOut(true);
    console.log("Starting logout process"); // Debug log
    try {
      const res = await axiosInstance.post("/auth/logout/", { refresh_token: refresh });
      if (res.status === 200) {
        console.log("Logout successful, removing local storage items"); // Debug log
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        localStorage.removeItem('user');
        navigate('/login');
        toast.success("Logout successful");
      }
    } catch (error) {
      console.log("Logout failed:", error); // Debug log
      toast.error("Logout failed");
    } finally {
      console.log("Resetting logout state"); // Debug log
      setIsLoggingOut(false);
    }
  };

  const handleProfile = async () => {
    console.log("Profile button clicked"); // Debug log
    try {
      const resp = await axiosInstance.get("/auth/profile/");
      if (resp.status === 200) {
        console.log("Profile fetched successfully, navigating to profile page"); // Debug log
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error); // Debug log
      toast.error("Failed to fetch profile");
    }
  };

  return (
    <header className="header flex justify-between items-center p-4 bg-gray-900 text-white">
      <input
        type="text"
        placeholder="Search..."
        className="p-2 rounded bg-gray-700"
      />
      <div className="flex space-x-4">
        <button className="p-2 bg-gray-700 rounded">Notifications</button>
        <button className="p-2 bg-gray-700 rounded">News</button>
        {user ? (
          <>
            <button
              onClick={handleLogout}
              className={`bg-red-500 font-bold text-white px-4 py-2 rounded-lg ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoggingOut}
            >
              Logout
            </button>
            <button onClick={handleProfile} className='bg-green-500 font-bold text-white px-4 py-2 rounded-lg ml-2'>
              Profile
            </button>
          </>
        ) : (
          <button onClick={() => navigate('/login')} className='bg-blue-500 font-bold text-white px-4 py-2 rounded-lg'>
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
