import React from "react";
// import UserNav from "../../components/user/UserNav";
import ProfileLists from "../../components/user/profile/ProfileLists";
import UserSideBar from "../../../src/components/user/UserSidebar";

const UserProfile = () => {
  return (
    <div className="lg:flex ">
      {/* <UserNav/> */}
      <UserSideBar />
      <div className=" flex-grow p-6 bg-gray-300  ">
        <h2 className="text-3xl font-bold mb-6">User Profile</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ProfileLists />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
