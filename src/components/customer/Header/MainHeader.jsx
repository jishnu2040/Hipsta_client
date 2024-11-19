import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogIn } from 'react-icons/fi';
import img from '../../../assets/hipsta-high-resolution-logo-transparent1.png';
import axiosInstance from '../../../utlils/axiosinstance';
import { toast } from 'react-toastify';


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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <header className="bg-white shadow-md p-4 px-24 border-b-2 ">
      <div className="container mx-auto px-24 flex items-center justify-between h-full">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={img} alt="Logo" className="h-11 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 items-center">
          {user ? (
            <UserActions
              user={user}
              handleProfile={handleProfile}
              handleLogout={handleLogout}
            />
          ) : (
            <Link
              to="/login"
              className="flex items-center bg-gray-800 text-white font-bold px-2 py-2 rounded-lg hover:bg-gray-900"
              aria-label="Login"
            >
              <FiLogIn size={20} className="mr-2" /> 
              login
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
              <UserActions
                user={user}
                handleProfile={handleProfile}
                handleLogout={handleLogout}
                isMobile={true}
              />
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

// Component for User Actions (Profile & Logout)
function UserActions({ user, handleProfile, handleLogout, isMobile = false }) {
  return (
    <div className={`flex ${isMobile ? 'flex-col items-center' : 'space-x-4'}`}>
      <p className={`text-black font-bold ${isMobile ? 'mb-2' : 'hidden md:block'}`}>
        {user?.name}
      </p>
      <button
        onClick={handleProfile}
        className="bg-green-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-green-600"
        aria-label="Go to Profile"
      >
        Profile
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-red-600"
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  );
}

export default MainHeader;
