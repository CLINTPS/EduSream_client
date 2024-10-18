import React, { useEffect, useState } from "react";
import UserSideBar from "../../components/user/UserSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../../common/api";
import axios from "axios";
import LodingData from "../../components/lodingData/LodingData";
import { useSelector } from "react-redux";

const UserSingleEnrolledCourses = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { user } = useSelector((state) => state.user);
  const [course, setCourse] = useState(null);
  const [assessmentExists, setAssessmentExists] = useState(false);
  const [examDetails, setExamDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasAttendedAssessment, setHasAttendedAssessment] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);
  // const [showExamDetails,setShowExamDetails]=useState(false)
  // console.log("_____________________", course);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${URL}/course/enrollment/singleView/${courseId}`
        );

        if (response.data && response.data.data) {
          setCourse(response.data.data.courseId);
        }
      } catch (error) {
        console.error("Error fetching the course data:", error);
      }
    };

    fetchData();
  }, [courseId]);

  console.log("Course data:", course);

  useEffect(() => {
    const checkExam = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${URL}/course/check-Assessment/${course._id}`
        );
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

    if (course) {
      checkExam();
    }
  }, [course]);

  useEffect(() => {
    const checkAttendance = async () => {
      if (examDetails && user) {
        try {
          const attendanceResponse = await axios.post(
            `${URL}/course/check-assessment-attendance`,
            {
              examId: examDetails._id,
              userId: user._id,
            }
          );
          console.log("attendanceResponse...", attendanceResponse);

          if (attendanceResponse.data.success && attendanceResponse.data.data) {
            setHasAttendedAssessment(true);
            setAssessmentResult(attendanceResponse.data.data);
          } else {
            setHasAttendedAssessment(false);
          }
        } catch (error) {
          console.error("Error checking attendance:", error);
        }
      }
    };

    if (examDetails && user) {
      checkAttendance();
    }
  }, [examDetails, user]);

  const handleBack = () => {
    navigate("/home/enrolled-list");
  };

  const handleStartAssessment = () => {
    navigate(`/home/assessment/${examDetails._id}`, {
      state: {
        examDetails,
        courseId
      },
    });
  };
  if (loading || !course) {
    return (
      <div className="lg:flex bg-gray-100 min-h-screen">
        <UserSideBar />
        <div className="flex-grow p-8 lg:ml-64">
          <LodingData />;
        </div>
      </div>
    );
  }

  return (
    <div className="lg:flex bg-gray-100 min-h-screen">
      <UserSideBar />
      <div className="flex-grow p-8 lg:ml-64">
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            {course?.title || "No Title"}
          </h1>
          <div className="mt-4 lg:mt-0">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-full shadow hover:bg-gray-600 transition duration-300"
              onClick={handleBack}
            >
              Back
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <img
              src={course.thumbnailImage}
              alt={course.title}
              className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
            />
            <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Course Details
              </h3>
              <ul className="space-y-4 text-gray-700">
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
              </ul>
            </div>

            <div className="p-4 mt-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                Assessment Details
              </h3>
              <ul className="space-y-4 text-gray-700">
                {assessmentExists ? (
                  <div>
                    {hasAttendedAssessment && assessmentResult ? (
                      <div className="mt-4">
                        <h4 className="text-lg font-bold text-gray-800">
                          Exam Result:{" "}
                          <span
                            className={
                              assessmentResult.resultStatus === "Passed"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {assessmentResult.resultStatus}
                          </span>
                        </h4>
                        <button
                          className="bg-gray-600 text-white py-2 px-2 rounded-lg mt-2"
                          onClick={() => navigate("/home/result-certificate")}
                        >
                          View Result
                        </button>
                      </div>
                    ) : (
                      <button
                        className="bg-green-400 py-2 px-4 rounded-lg"
                        onClick={handleStartAssessment}
                      >
                        Start Assessment
                      </button>
                    )}
                  </div>
                ) : (
                  <div>No assessment found for this course.</div>
                )}
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
    </div>
  );
};

export default UserSingleEnrolledCourses;
