import React, { useEffect, useState } from "react";
import UserNav from "../../components/user/UserNav";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/actions/userAction";
import LodingData from "../../components/lodingData/LodingData";
import UserFilterBar from "../../components/user/UserFilterBar";
import { Link } from "react-router-dom";

const UserCoursePage = () => {
  const { course, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  if (loading) {
    return (
      <div>
        <UserNav />
        <LodingData />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <UserNav />
      <div className="bg-white shadow-md">
        <UserFilterBar />
      </div>
      <div className="flex-grow p-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
          All Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {course && course.length > 0 ? (
            course.map((item) => (
              <div
                key={item._id}
                className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={item.thumbnailImage}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 truncate">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">
                      {item.pricing.type === "free"
                        ? "Free"
                        : `$${item.pricing.amount}`}
                    </span>
                    <Link
                      to={`/home/course/${item._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-600">
              No courses available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCoursePage;
