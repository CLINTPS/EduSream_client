import React from "react";
// import UserHomeData from "../../components/user/UserHomeData";
import UserNav from "../../components/user/UserNav";
import Banner from "../../components/LandingPage/Banner";
import UserHomeCourses from "../../components/user/home/UserHomeCourses";
import Footer from "../../components/Footer";

const UserHome = () => {
  return (
    <>
      <UserNav />
      <Banner />
      <UserHomeCourses/>
      <Footer />
    </>
  );
};

export default UserHome;
