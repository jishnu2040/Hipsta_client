// Header.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import axiosInstance from '../../utlils/axiosinstance';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    const refresh = localStorage.getItem('refresh_token'); 
    if (!refresh) {
      toast.error('No refresh token found. Logging out locally.');
      localStorage.clear();
      navigate('/');
      return;
    }

    try {
      const res = await axiosInstance.post('/auth/logout/', { refresh_token: refresh });

      if (res.status === 204) {
        localStorage.clear();
        navigate('/');
        toast.success('Logout successful');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate('/login');
        toast.info('Session expired. Logged out.');
      } else {
        toast.error('Logout failed. Please try again.');
      }
    }
  };

  const handleLogin = () => {
    navigate('/admin/login');
  };

  return (
    <header className="bg-white text-gray-800 shadow-md">
      <div className="flex items-center justify-end p-3">
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-xl" aria-label="Admin emoji">👤</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              aria-label="Login"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
