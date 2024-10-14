import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InstructorSidebar from "../../../components/instrcture/InstructorSidebar";
import { useSelector } from "react-redux";
import AddExamModal from "../../../components/modals/AddExamModal";
import ViewExamModal from "../../../components/modals/ViewExamModal";
import EditExamModal from "../../../components/modals/EditExamModal";
import { URL } from "../../../common/api";
import axios from "axios";
import { config } from "../../../common/configurations";
import toast from "react-hot-toast";

const InstractureSingleCourses = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const { course } = location.state;

  const [isAddExamModalOpen, setIsAddExamModalOpen] = useState(false);
  const [isViewExamModalOpen, setIsViewExamModalOpen] = useState(false);
  const [isEditExamModalOpen, setIsEditExamModalOpen] = useState(false);
  const [assessmentExists, setAssessmentExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [examDetails, setExamDetails] = useState(null);


  useEffect(() => {
    const checkExam = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${URL}/course/check-Assessment/${course._id}`,
          config
        );
        console.log("Assessment responsre..", response);

        if (response.data.success) {
          setAssessmentExists(true);
          setExamDetails(response.data.data);
        } else {
          setAssessmentExists(false);
        }
      } catch (error) {
        console.error("Error checking exam existence", error);
        setAssessmentExists(false);
      } finally {
        setLoading(false);
      }
    };

    checkExam();
  }, [course._id]);

  const handleEdit = (course) => {
    navigate(`/instructor/courses/edit/${course._id}`, { state: { course } });
  };

  const handleAddExam = () => {
    setIsAddExamModalOpen(true);
  };

  const handleModalSubmit = (examData) => {
    // console.log("Exam Data:", examData);
    setAssessmentExists(true);
    setExamDetails(examData);
  };

  const handleViewExam = () => {
    if (examDetails) {
      setIsViewExamModalOpen(true);
    }
  };

  const handleEditExam = () => {
    if (examDetails) {
      setIsEditExamModalOpen(true);
    }
  };

  return (
    <div className="lg:flex bg-gray-100 min-h-screen">
      <InstructorSidebar />
      <div className="flex-grow p-8 lg:ml-64">
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">{course.title}</h1>
          <div className="mt-4 lg:mt-0">
            {!course.isRejected ? (
              <button
                className="bg-gray-600 text-white py-2 px-4 rounded-full shadow hover:bg-gray-700 transition duration-300"
                onClick={() => handleEdit(course)}
              >
                Edit Course
              </button>
            ) : null}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <img
              src={course.thumbnailImage}
              alt={course.title}
              className="w-full h-48 object-cover rounded-lg shadow-md mb-4"
            />
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Course Details
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <span className="font-medium">Instructor:</span>{" "}
                  {user.firstName} {user.lastName}
                </li>
                <li>
                  <span className="font-medium">Category:</span>{" "}
                  {course.category}
                </li>
                <li>
                  <span className="font-medium">Language:</span>{" "}
                  {course.language}
                </li>
                <li>
                  <span className="font-medium">Payment Type:</span>{" "}
                  {course.pricing.type}
                </li>
                <li>
                  <span className="font-medium">Price:</span>{" "}
                  {course.pricing.amount === 0
                    ? "Free"
                    : `$${course.pricing.amount}`}
                </li>
                <li>
                  <span className="font-medium">Published:</span>{" "}
                  {course.isPublished ? "Yes" : "No"}
                </li>
                <li>
                  <span className="font-medium">Blocked:</span>{" "}
                  {course.isBlocked ? "Yes" : "No"}
                </li>
              </ul>
            </div>

            <div className="flex bg-gray-50 mt-5">
              <div className="flex flex-col p-5 w-full">
                {loading ? (
                  <p className="text-gray-600 text-lg">Loading...</p>
                ) : (
                  <>
                    {assessmentExists ? (
                      <div className="flex space-x-4 justify-center">
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition duration-200"
                          onClick={handleViewExam}
                        >
                          View Exam
                        </button>
                        <button
                          onClick={handleEditExam}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transition duration-200"
                        >
                          Edit Exam
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-4 justify-center">
                        <button
                          onClick={handleAddExam}
                          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition duration-200"
                        >
                          Add Exam
                        </button>
                      </div>
                    )}
                    <AddExamModal
                      isOpen={isAddExamModalOpen}
                      onClose={() => setIsAddExamModalOpen(false)}
                      onSubmit={handleModalSubmit}
                      instructorId={user._id}
                      courseId={course._id}
                    />

                    {examDetails && (
                      <ViewExamModal
                        isOpen={isViewExamModalOpen}
                        onClose={() => setIsViewExamModalOpen(false)}
                        exam={examDetails}
                      />
                    )}

                    {examDetails && (
                      <EditExamModal
                        isOpen={isEditExamModalOpen}
                        onClose={() => setIsEditExamModalOpen(false)}
                        exam={examDetails}
                        onSubmit={handleModalSubmit}
                        instructorId={user._id}
                        courseId={course._id}
                      />
                    )}
                  </>
                )}
              </div>
            </div>

            {course.isRejected ? (
              <div className="p-4 mt-4  bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-2xl text-red-600 font-semibold mb-4">
                  Course Rejected
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>
                    <span className="font-medium">Rejected:</span>{" "}
                    {course.isRejected ? "Yes" : "No"}
                  </li>
                  <li>
                    <span className="font-medium">Reasson:</span>{" "}
                    {course.rejectReason}
                  </li>
                </ul>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Thumbnail Video
              </h3>
              <video controls className="w-full rounded-lg shadow-md">
                <source src={course.thumbnailVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Course Description
              </h3>
              <p className="text-gray-600 break-words">{course.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Lessons</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {course.lessons.map((lesson) => (
              <div
                key={lesson._id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm relative overflow-hidden"
              >
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  Lesson {lesson.lessonNumber}: {lesson.title}
                </h4>
                <div className="mb-4">
                  <span className="text-gray-600 h-24  w-full break-words">
                    {lesson.description}
                  </span>
                </div>
                <video controls className="w-full rounded-lg shadow-sm">
                  <source src={lesson.lessonVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstractureSingleCourses;
