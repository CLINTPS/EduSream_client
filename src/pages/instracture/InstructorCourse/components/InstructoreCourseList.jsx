import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmtyData from "../../../../components/empty/EmtyData";
import { fetchInstructorCourses } from "../../../../redux/actions/courseAction";
import LodingData from "../../../../components/lodingData/LodingData";

const InstructorCourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { courses, loading, error } = useSelector((state) => state.course);

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchInstructorCourses(user._id));
    }
  }, [dispatch, user]);

  const handleAddPage = () => {
    navigate("/instructor/courses/add");
  };

  const handleFullView = (course) => {
    navigate(`/instructor/courses/singleView/${course._id}`, {
      state: { course },
    });
  };

  // const handleEdit = (course) => {
  //   navigate(`/instructor/courses/edit/${course._id}`, { state: { course } });
  // };

  if (loading) {
    return (
      <LodingData/>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{`Error: ${error}`}</div>;
  }

  const coursesData = Array.isArray(courses) ? courses : courses?.data || [];
  const totalPages = Math.ceil(coursesData.length / coursesPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = coursesData.slice(
    startIndex,
    startIndex + coursesPerPage
  );

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My Courses</h2>
        <button
          className="flex items-center bg-gray-500 text-white py-2 px-4 rounded-full shadow hover:bg-gray-700 transition duration-300"
          onClick={handleAddPage}
        >
          Add New
          <IoMdAddCircleOutline className="ml-2 h-5 w-5" />
        </button>
      </div>
      {coursesData.length === 0 ? (
        <EmtyData />
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentCourses.map((course) => (
            <div
              key={course._id}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow flex flex-col"
            >
              <img
                src={course.thumbnailImage}
                alt={course.title}
                className="h-44 w-full object-cover rounded-t-lg mb-4"
              />
              <div className="flex-1 flex flex-col justify-between">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {course.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {course.language}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      course.pricing.type === "free"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {course.pricing.type}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      course.isRejected
                        ? "bg-red-100 text-red-800"
                        : course.isPublished
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {course.isRejected
                      ? "Rejected"
                      : course.isPublished
                      ? "Active"
                      : "Pending"}
                  </span>
                </div>

                <div className="flex justify-end">
                  {course.isRejected ? (
                    <button
                      className="bg-gray-500 text-white py-2 px-4 rounded-full shadow hover:bg-gray-700 transition duration-300"
                      onClick={() => handleFullView(course)}
                    >
                      View
                    </button>
                  ) : (
                    <button
                      className="bg-gray-500 text-white py-2 px-4 rounded-full shadow hover:bg-gray-700 transition duration-300"
                      onClick={() => handleFullView(course)}
                    >
                      View & Edit
                    </button>
                  )}
                  {/* <button
                    className="bg-gray-500 ml-1 text-white py-1 px-2 rounded-lg self-end hover:bg-gray-600 transition"
                    onClick={() => handleEdit(course)}
                  >
                    Edit
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {coursesData.length === 0 ?(
        null
      ):(
      <div className="flex items-center justify-between mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition disabled:bg-gray-300"
        >
          Previous
        </button>
        <p className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
      )}
    </div>
  );
};

export default InstructorCourseList;
