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
  const currentCourses = enrolledCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

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
    <div className="bg-gray-200 max-w-7xl mx-auto p-4">
      {currentCourses?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentCourses.map((course) => (
              <div
                key={course.courseId._id}
                className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 overflow-hidden"
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
                      : course.courseId.description ||
                        "No description available"}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {course.courseId.language}
                  </p>
                  <div className="flex items-end justify-end">
                    <button
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      onClick={() => handleFullView(course.courseId._id)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            {Math.ceil(enrolledCourses.length / coursesPerPage) > 0 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 mx-1 border rounded-lg ${
                    currentPage === 1
                      ? "text-gray-400 border-gray-300"
                      : "text-blue-600 border-blue-600 hover:bg-blue-100"
                  }`}
                >
                  Previous
                </button>

                {Array.from(
                  {
                    length: Math.ceil(enrolledCourses.length / coursesPerPage),
                  },
                  (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 mx-1 border rounded-lg ${
                        currentPage === index + 1
                          ? "bg-blue-600 text-white"
                          : "text-blue-600 border-blue-600 hover:bg-blue-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(enrolledCourses.length / coursesPerPage)
                  }
                  className={`px-4 py-2 mx-1 border rounded-lg ${
                    currentPage ===
                    Math.ceil(enrolledCourses.length / coursesPerPage)
                      ? "text-gray-400 border-gray-300"
                      : "text-blue-600 border-blue-600 hover:bg-blue-100"
                  }`}
                >
                  Next
                </button>
              </div>
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
