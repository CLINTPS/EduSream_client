import React from "react";
import ProfileLists from "../../components/user/profile/ProfileLists";
import UserSideBar from "../../../src/components/user/UserSidebar";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate()
  const handleBack=()=>{
    navigate('/home')
  }
  return (
    <div className="lg:flex ">
      <UserSideBar />
      <div className=" flex-grow p-6 h-screen bg-gray-300 lg:ml-64 ">
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-6">User Profile</h2>
          <button className="bg-gray-400 h-10 px-4 rounded-2xl"
          onClick={handleBack}>Back</button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ProfileLists />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
