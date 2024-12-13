import React from 'react'
import MainHeader from '../../../components/customer/Header/MainHeader';
import HelpDashBoard from './HelpDashBoard';

const HelpDesk = () => {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <MainHeader />
      <div className="PartnerDetailsPage md:mx-32 mt-6">
        {/* Pass partnerDetails as props to the child component */}
        <HelpDashBoard />
      </div>
    </div>
  )
}

export default HelpDesk