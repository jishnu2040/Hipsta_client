import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import ThemeContext from '../../../ThemeContext';

const Profile = () => {
  const { isDarkMode } = useContext(ThemeContext); // Accessing the dark mode context

  return (
    <div
      className={`flex flex-col lg:flex-row h-screen ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      <div
        className={`w-full lg:w-1/6 lg:h-screen lg:overflow-y-auto ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}
      >
        <ProfileMenu />
      </div>
      <div
        className={`w-full lg:w-5/6 rounded-lg overflow-y-auto ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
