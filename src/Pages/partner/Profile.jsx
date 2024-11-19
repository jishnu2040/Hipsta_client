import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from '../../components/partner/profile/ProfileMenu';
import { Outlet } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen ">
      <div className="w-full lg:w-1/6  lg:h-screen lg:overflow-y-auto">
        <ProfileMenu />
      </div>
      <div className="w-full lg:w-5/6  rounded-lg  overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Profile;