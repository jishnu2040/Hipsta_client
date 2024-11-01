// Header.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    navigate('/admin/login');
  };

  const handleLogin = () => {
    navigate('/admin/login');
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">
            Admin Dashboard
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-xl">👤</span> {/* Admin emoji */}
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
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
