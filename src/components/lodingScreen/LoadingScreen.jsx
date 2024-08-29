import React from 'react'
import EduLogo from '../../../src/assets/logos/Es-old.png';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <img src={EduLogo} alt="Logo" className="h-20 mb-8 mx-auto" />
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce delay-150"></div>
          <div className="w-4 h-4 rounded-full bg-white animate-bounce delay-300"></div>
        </div>
        <p className="text-white mt-4">Loading, please wait...</p>
      </div>
    </div>
  )
}

export default LoadingScreen
