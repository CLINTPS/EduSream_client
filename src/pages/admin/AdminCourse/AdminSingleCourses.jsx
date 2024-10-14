import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/admin/Sidebar";
import { approveCourse, rejectCourse } from "../../../redux/actions/adminAction";
import { useDispatch } from "react-redux";
import ConfirmationModal from '../../../components/confirmModal/ConfirmationModal'
import RejectionModal from '../../../components/rejectModal/RejectionModal'
import toast from "react-hot-toast";

const AdminSingleCourses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const location = useLocation();
  const { course } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  // console.log("....................", course);

  if (!course) {
    return <p>No course data available</p>;
  }

  const handleApprove = () => {
    setIsModalOpen(true);
  };

  const confirmApprove = async() => {
    setIsModalOpen(false);
    const {meta} = await dispatch(approveCourse({ id: course._id }));
    console.log("Response", meta);
    if(meta.requestStatus === "fulfilled"){
      toast.success("Course approvel successfully..")
      navigate("/admin/courses")
    }else{
      toast.error("Course approvel failed..")
      navigate("/admin/courses")
    }
  };

  const handleReject = () => {
    console.log("check reject");
    setIsRejectModalOpen(true);
  };

  const confirmReject = async (reason) => {
    setIsRejectModalOpen(false);
    const { meta } = await dispatch(rejectCourse({ id: course._id, reason }));
    if (meta.requestStatus === "fulfilled") {
      toast.success("Course rejection successfully.");
      navigate("/admin/courses");
    } else {
      toast.error("Course rejection failed.");
      navigate("/admin/courses");
    }
  };

  return (
    <div className="lg:flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-grow p-8 lg:ml-64">
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">{course.title}</h1>
          <div className="mt-4 lg:mt-0">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700"
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              className="bg-red-600 ml-1 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700"
              onClick={handleReject}
            >
              Reject
            </button>
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
      
      <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={confirmApprove} 
        message="Are you sure you want to approve this course?" 
      />
      <RejectionModal 
          isOpen={isRejectModalOpen} 
          onClose={() => setIsRejectModalOpen(false)} 
          onConfirm={confirmReject} 
        />
    </div>
  );
};

export default AdminSingleCourses;
