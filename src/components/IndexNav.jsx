import React, { useState } from 'react';
import EduLogo from '../../src/assets/logos/Es-old-b&w.png'

const IndexNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gradient-to-b bg-gray-200 p-4">
      <div className="container-flex px-6 mx-auto flex justify-between items-center">
      <a href="/" className="flex items-center text-white text-2xl font-bold">
          <img src={EduLogo} alt="Logo" className="h-11 mr-2" />
        </a>
        <div className="hidden md:flex items-center font-semibold space-x-4">
          <a href="/" className="text-black hover:text-black hover:underline">Home</a>
          <a href="#" className="text-black hover:text-black hover:underline">Courses</a>
          <a href="/services" className="text-black hover:text-black hover:underline">About</a>
          <a href="/contact" className="text-black hover:text-black hover:underline">Contact</a>
          <a href="/login" className="text-black bg-gray-300 hover:bg-gray-400 rounded-2xl px-6 py-1.5">Login</a>
          <a href="/signup" className="text-black bg-gray-300 hover:bg-gray-400 rounded-2xl px-4 py-1.5">Signup</a>
        </div>
        <div className="md:hidden">
          <button className="text-white focus:outline-none" onClick={toggleMenu}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden flex flex-col font-semibold items-center`}>
        <a href="/" className="block text-black hover:text-black hover:underline p-2">Home</a>
        <a href="/about" className="block text-black hover:text-black hover:underline p-2">Courses</a>
        <a href="/services" className="block text-black hover:text-black hover:underline p-2">About</a>
        <a href="/contact" className="block text-black hover:text-black hover:underline p-2">Contact</a>
        <a href="/login" className="block text-black bg-gray-300 hover:bg-gray-400 rounded p-2 mt-2">Login</a>
        <a href="/signup" className="block text-black bg-gray-300 hover:bg-gray-400 rounded p-2 mt-2">Signup</a>
      </div>
    </nav>
  );
};

export default IndexNav;
