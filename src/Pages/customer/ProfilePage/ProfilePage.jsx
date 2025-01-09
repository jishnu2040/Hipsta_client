import React from 'react'
import ProfileDashBoard from '../../../components/customer/profile/ProfileDashBoard'
import MainHeader from '../../../components/customer/Header/MainHeader'
const ProfilePage = () => {
  return (
    <div className="flex flex-col">
      <MainHeader />
      <div className="PartnerDetailsPage md:mx-32 mt-6">
        {/* Pass partnerDetails as props to the child component */}
        <ProfileDashBoard />
      </div>
    </div>
  )
}

export default ProfilePage