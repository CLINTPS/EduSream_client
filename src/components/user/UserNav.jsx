import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/actions/userAction";
import EduLogo from "../../../src/assets/logos/Es-old-b&w.png";
import avater from "../../../src/assets/profile/avater.jpg";
import ContactModal from "../modals/ContactModal";
import NotificationModal from "../modals/NotificationModal";
import { IoMdNotificationsOutline } from "react-icons/io";

const UserNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleNotificationModal = () => {
    setIsNotificationModalOpen(!isNotificationModalOpen);
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
            <Link to="#" className="text-black hover:text-black hover:underline">
              About
            </Link>
            <button onClick={toggleModal} className="text-black hover:text-black hover:underline">
              Contact
            </button>

            <button
              onClick={toggleNotificationModal}
              className="relative focus:outline-none"
            >
              {/* <IoMdNotificationsOutline className="text-2xl text-black" /> */}
              {/* <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                3
              </span> */}
            </button>
            
            <div className="relative">
              <button className="focus:outline-none flex items-center space-x-1 border-2 border-gray-300 rounded-3xl" onClick={toggleProfileMenu}>
                <img
                  src={user?.profile?.avatar || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="h-9 w-9 rounded-full border-2 border-gray-200"
                />
                <div className="text-left">
                  <h1 className="text-sm font-medium mr-2">{user?.firstName || "--"}</h1>
                </div>
              </button>
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-1 z-20">
                  <Link to="/home/profile" className="block px-4 py-2 text-black hover:bg-gray-200">
                    Profile
                  </Link>
                  <a href="/" onClick={handleLogout} className="block px-4 py-2 text-black hover:bg-gray-200">
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button className="text-black focus:outline-none" onClick={toggleMenu}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className={`${menuOpen ? "block" : "hidden"} md:hidden flex flex-col font-semibold items-center`}>
          <Link to="/" className="block text-black hover:text-black hover:underline p-2">
            Home
          </Link>
          <Link to="/home/AllCourses" className="block text-black hover:text-black hover:underline p-2">
            Courses
          </Link>
          <Link to="#" className="block text-black hover:text-black hover:underline p-2">
            About
          </Link>
          <button onClick={toggleModal} className="block text-black hover:text-black hover:underline p-2">
            Contact
          </button>
          <Link to="/home/profile" className="block px-4 py-2 text-black hover:bg-gray-200">
            Profile
          </Link>
          <a href="/" onClick={handleLogout} className="block px-4 py-2 text-black hover:bg-gray-200">
            Logout
          </a>
          <img src={avater} alt="User Profile" className="h-10 w-10 rounded-full border-2 border-gray-300" />
        </div>
      </nav>

      <ContactModal isOpen={isModalOpen} onClose={toggleModal} title="Company Details">
        <p>Company Name: EduStream</p>
        <p>Email: contact@edustream.com</p>
        <p>Phone: +1 234 567 890</p>
        <p>Address: 123 Learning Lane, Knowledge City, EDU 45678</p>
      </ContactModal>

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={toggleNotificationModal}
      ><h1>Check</h1></NotificationModal>
    </>
  );
};

export default UserNav;
