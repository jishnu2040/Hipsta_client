import React from 'react'
import Heroes from '../../../components/customer/BusinessHome/Heroes'
import Feature from '../../../components/customer/BusinessHome/feature-section'
import Pricing from '../../../components/customer/BusinessHome/Pricing'
import ServiceProvide from '../../../components/customer/BusinessHome/ServiceProvide'
import Promo from '../../../components/customer/BusinessHome/Promo'
import TechicalSupport from '../../../components/customer/BusinessHome/TechicalSupport'
import Footer from '../../../components/customer/footer/Footer'
const BusinessHome = () => {
  return (
    
    <>
    <Heroes />
    <Promo />
    <ServiceProvide />
    <Feature />
    <Pricing />
    <TechicalSupport />
    <Footer />
    </>
    
  )
}

export default BusinessHome