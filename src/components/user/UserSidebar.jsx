import React, { useState } from 'react'
import EduLogo from "../../../src/assets/logos/Es-old.png"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../../redux/actions/userAction';
import { MdLogout } from "react-icons/md";


const UserSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <div className="lg:flex">
      <div className="lg:hidden flex items-center justify-between bg-gray-900 text-white p-4">
        <Link to="/admin/dashboard">
          <img src={EduLogo} alt="Logo" className="h-10" />
        </Link>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          ☰
        </button>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:block bg-gray-900 text-center text-white w-64 h-screen fixed lg:relative z-50 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-center h-24 bg-gray-900">
          <Link to="/">
            <img src={EduLogo} alt="Logo" className="h-16" />
          </Link>
        </div>
        <div className="flex flex-col flex-grow overflow-y-auto">

          <Link to="/home/profile" className="px-6 py-4 hover:bg-gray-700">
            Profile
          </Link>
          <Link to="/home/purchasedCourses" className="px-6 py-4 hover:bg-gray-700">
            Courses
          </Link>
          <Link to="#" className="px-6 py-4 hover:bg-gray-700">
            Messages
          </Link>
        </div>
        <div className="flex items-center justify-center h-16 hover:bg-gray-700 bg-gray-900 mt-96">
        <MdLogout />
          <a
            href="/"
            onClick={handleLogout}
            className="text-sm ml-2"
          >
            Log Out
          </a>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  )
}

export default UserSideBar
