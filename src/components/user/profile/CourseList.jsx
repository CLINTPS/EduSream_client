import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrolledCourses } from "../../../redux/actions/userAction";
import LodingData from "../../lodingData/LodingData";
import EmtyData from "../../../components/empty/EmtyData";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { enrolledCourses, loading, error } = useSelector(
    (state) => state.user
  );
  // console.log("Course list enrolledCourses...", enrolledCourses);


  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = enrolledCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchEnrolledCourses(user._id));
    }
  }, [dispatch, user]);

  const handleFullView = (courseId) => {
    navigate(`singleView/${courseId}`);
  };

  if (loading) {
    return <LodingData />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[78vh] text-red-500 text-center">{`Error: ${error}`}</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      {currentCourses?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentCourses.map((course) => (
              <div
                key={course.courseId._id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={course.courseId.thumbnailImage}
                  alt={course.courseId.title || "Course Image"}
                  onClick={() => handleFullView(course.courseId._id)}
                />
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {course.courseId.title || "Untitled Course"}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {course.courseId.description &&
                    course.courseId.description.length > 100
                      ? course.courseId.description.slice(0, 100) + "..."
                      : course.courseId.description || "No description available"}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {course.courseId.language}
                  </p>
                  <div className="flex items-end justify-end">
                    <button
                      className="inline-flex px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600"
                      onClick={() => handleFullView(course.courseId._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            {Array.from(
              { length: Math.ceil(enrolledCourses.length / coursesPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </>
      ) : (
        <EmtyData message="No enrolled courses found" />
      )}
    </div>
  );
};

export default CourseList;
