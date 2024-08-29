import React from 'react'
import backgroundImage from '../../assets/banner/banner-2.jpg'
// import IndexNav from '../../components/IndexNav'
import '../../App.css'

const Banner = () => {
  return (
    <div className="relative">
  <img
    src={backgroundImage}
    alt="Banner"
    className="w-full h-auto object-cover"
  />
  <div className="absolute inset-0 flex items-start justify-start px-4 sm:px-8 md:px-12 lg:px-16 pt-8 sm:pt-12 md:pt-16 lg:pt-20">
    <div className="text-container p-2 sm:p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white slide-in-left leading-tight">
        <span className="text-green-500 slide-in-left" style={{ animationDelay: '0.5s' }}>Education </span>
        without <br />
        <span className="block slide-in-left" style={{ animationDelay: '0.5s' }}>boundaries</span>
      </h1>
    </div>
  </div>
</div>


  )
}

export default Banner
