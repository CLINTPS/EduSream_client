import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { URL } from "../../../common/api";
import axios from "axios";

const RoleChange = () => {

  const { user }= useSelector((state)=>state.user)

  const handleRoleChange= async(role)=>{
    console.log("User role change....",role,user.email);
    
      const response = await axios.post(`${URL}/auth/update-role`,{
        role:role,
        email:user.email
      })
  }

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] bg-gray-100 space-y-8">
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleRoleChange('student')}
        >
          Student
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => handleRoleChange('instructor')}
        >
          Instructor
        </button>
      </div>
      <Link
        to="/user/home"
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        LogOut
      </Link>
    </div>
  );
};

export default RoleChange;
