import React, { useState } from "react";
import { Link } from "react-router-dom";
import EduLogo from "../../src/assets/logos/Es-old-b&w.png";
import ContactModal from "../components/modals/ContactModal";

const IndexNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <nav className="bg-gradient-to-b bg-gray-200 p-4">
        <div className="container-flex px-6 mx-auto flex justify-between items-center">
        
          <Link to="/" className="flex items-center text-2xl font-bold">
            <img src={EduLogo} alt="Logo" className="h-11 mr-2" />
          </Link>

          
          <div className="hidden md:flex items-center font-semibold space-x-4">
            <Link to="/" className="text-black hover:text-black hover:underline">
              Home
            </Link>
            <Link to="/AllCourses" className="text-black hover:text-black hover:underline">
              Courses
            </Link>
            <Link to="/about" className="text-black hover:text-black hover:underline">
              About
            </Link>
            <button onClick={toggleModal} className="text-black hover:text-black hover:underline">
              Contact
            </button>
            <Link
              to="/login"
              className="text-black bg-gray-300 hover:bg-gray-400 rounded-2xl px-6 py-1.5"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-black bg-gray-300 hover:bg-gray-400 rounded-2xl px-4 py-1.5"
            >
              Signup
            </Link>
          </div>

      
          <div className="md:hidden">
            <button className="text-black focus:outline-none" onClick={toggleMenu}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>

     
        <div className={`${menuOpen ? "block" : "hidden"} md:hidden flex flex-col font-semibold items-center`}>
          <Link to="/" className="block text-black hover:text-black hover:underline p-2">
            Home
          </Link>
          <Link to="/AllCourses" className="block text-black hover:text-black hover:underline p-2">
            Courses
          </Link>
          <Link to="/about" className="block text-black hover:text-black hover:underline p-2">
            About
          </Link>
          <button onClick={toggleModal} className="block text-black hover:text-black hover:underline p-2">
            Contact
          </button>
          <Link to="/login" className="block text-black bg-gray-300 hover:bg-gray-400 rounded p-2 mt-2">
            Login
          </Link>
          <Link to="/signup" className="block text-black bg-gray-300 hover:bg-gray-400 rounded p-2 mt-2">
            Signup
          </Link>
        </div>
      </nav>

      
      <ContactModal isOpen={isModalOpen} onClose={toggleModal} title="Company Details">
        <p>Company Name: EduStream</p>
        <p>Email: contact@edustream.com</p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 Learning Lane, Knowledge City, EDU 45678</p>
      </ContactModal>
    </>
  );
};

export default IndexNav;
