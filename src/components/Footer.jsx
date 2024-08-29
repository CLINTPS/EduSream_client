import React from 'react'
import Logo from '../assets/logos/Es-old.png'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 md:mt-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:px-44 md:py-4">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0 md:w-1/3">
          <img src={Logo} alt="EduStream Logo" className="h-28" />
        </div>

        <div className="flex flex-col items-center md:items-center md:w-1/3">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-gray-800 border border-gray-700 rounded py-2 px-4 focus:outline-none"
            />
            <button className="bg-green-800 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
              Subscribe
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm md:mt-5">
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms & Conditions</a>
          </div>
          <div className="text-sm mt-4 md:mt-5">
            © 2024 Education Stream Technologies Pvt Ltd
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
