import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import ThemeContext from '../../../ThemeContext';
import TeamMenu from '../../../components/partner/partnerDashboard/team/TeamMenu';

const Team = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="flex flex-col lg:flex-row h-screen" >
      <div className={`w-full lg:w-1/6 lg:h-screen lg:overflow-y-auto ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <TeamMenu />
      </div>
      <div className={`w-full lg:w-5/6  overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Team;
