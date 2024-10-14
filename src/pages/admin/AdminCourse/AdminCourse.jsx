import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import EmtyData from "../../../components/empty/EmtyData";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingCourses } from "../../../redux/actions/adminAction";
import LodingData from "../../../components/lodingData/LodingData";
import { useNavigate } from "react-router-dom";

const AdminCourse = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const { pendingCourses, loading, error } = useSelector((state) => state.admin);

  const [currentPage, setCurrentPage] = useState(1);

  console.log("pendingCourses...",pendingCourses);
  
  useEffect(() => {
    dispatch(fetchPendingCourses());
  }, [dispatch]);
  
  const coursePerPage = 3; 
  const totalPages = pendingCourses?.pendingCourse
  ? Math.ceil(pendingCourses.pendingCourse.length / coursePerPage)
  : 0;
  
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

  const startIndex = (currentPage - 1) * coursePerPage;
  const currentCourses = (pendingCourses?.pendingCourse || []).slice(
    startIndex,
    startIndex + coursePerPage
  );

  const handleFullView = (courses) => {
    navigate(`/admin/courses/singleView/${courses._id}`, { state: { course: courses } });
  };


  return (
    <div className="lg:flex">
      <Sidebar />
      <div className="flex-grow p-6 h-screen bg-gray-100 lg:ml-64">
        <h2 className="text-3xl font-semibold mb-6">New Courses</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p>Welcome to the admin Course!</p>
          {loading ? (
            <LodingData/>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : !pendingCourses?.pendingCourse?.length ? (
            <EmtyData />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">
                      Sl No
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">
                      Ins Id
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">
                    Category
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">
                      Language
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">
                      Create Date
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourses.map((courses, index) => (
                    <tr
                      key={courses._id}
                      className="border-b border-gray-200"
                    >
                      <td className="py-2 px-4">{startIndex+index + 1}</td>
                      <td className="py-2 px-4">
                        {courses.title || "--"}
                      </td>
                      <td className="py-2 px-4">
                        {courses.instructorRef || "--"}
                      </td>
                      <td className="py-2 px-4">
                        {courses.category || "--"}
                      </td>
                      <td className="py-2 px-4">
                        {courses.language || "--"}
                      </td>
                      <td className="py-2 px-4">
                        {courses.createdAt
                          ? formatDate(courses.createdAt)
                          : "--"}
                      </td>
                      <td className="py-2 px-4">
                        <button
                          className="bg-green-500 px-4 py-1 rounded"
                          onClick={() => handleFullView(courses)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {!pendingCourses?.pendingCourse?.length  ? (
          <p></p>
        ) : (
          <div className="flex items-center justify-between mt-4 ">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
            >
              Previous
            </button>
            <p className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCourse;
