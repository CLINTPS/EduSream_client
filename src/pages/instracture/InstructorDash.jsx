import React, { Suspense } from "react";
import InstructorSidebar from "../../components/instrcture/InstructorSidebar";
import WelcomeAnimation from "../../components/WelcomeAnimation";

const InstructorDash = () => {
  return (
    <div className="lg:flex">
      <InstructorSidebar />
        <WelcomeAnimation/>
    </div>
  );
};

export default InstructorDash;
