import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogIn } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa'; 
import img from '../../../assets/hipsta-high-resolution-logo-transparent1.png';
import axiosInstance from '../../../utlils/axiosinstance';
import { toast } from 'react-toastify';

function MainHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown state
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const refresh = localStorage.getItem('refresh_token');
  const userId = localStorage.getItem('userId');

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post('/auth/logout/', { refresh_token: refresh });

      if (res.status === 204) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
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

  const handleProfile = async () => {
    try {
      const resp = await axiosInstance.get(`/auth/profile/${userId}/`);
      if (resp.status === 200) {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to fetch profile');
    }
  };

  return (
    <header className="bg-white shadow-md p-4 px-24 border-b-2">
      <div className="container mx-auto px-24 flex items-center justify-between h-full">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={img} alt="Logo" className="h-11 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 items-center">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="focus:outline-none"
                aria-label="User Menu"
              >
                <FaUserCircle size={30} className="text-teal-700 hover:text-teal-900" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <button
                    onClick={handleProfile}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center bg-gray-800 text-white font-bold px-2 py-2 rounded-lg hover:bg-gray-900"
              aria-label="Login"
            >
              <FiLogIn size={20} className="mr-2" />
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <nav className="flex flex-col space-y-2 items-center">
            {user ? (
              <>
                <button
                  onClick={handleProfile}
                  className="w-full text-center bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-center bg-gray-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-gray-900"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="w-full text-center bg-gray-800 text-white font-bold px-4 py-2 rounded-lg hover:bg-gray-900"
                aria-label="Login"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default MainHeader;
