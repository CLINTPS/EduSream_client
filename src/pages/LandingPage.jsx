import React from 'react'
import IndexNav from '../components/IndexNav'
import Banner from '../components/LandingPage/Banner'
import OurSuccess from '../components/LandingPage/OurSuccess'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <div>
      <IndexNav/>
      <Banner/>
      <OurSuccess/>
      <Footer/>
    </div>
  )
}

export default LandingPage
