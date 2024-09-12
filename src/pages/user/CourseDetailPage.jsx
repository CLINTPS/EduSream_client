import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LodingData from "../../components/lodingData/LodingData";
import { getCourseById } from "../../redux/actions/userAction";
import UserNav from "../../components/user/UserNav";

const CourseDetailPage = () => {
  const { id } = useParams();
  const { courseDetail, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseById(id));
  }, [id, dispatch]);

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
    <div className="min-h-screen bg-gray-50">
      <UserNav />

      <div className="p-8 max-w-5xl mx-auto">
        {courseDetail ? (
          <>
            <div className="relative bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <img
                src={courseDetail.thumbnailImage}
                alt={courseDetail.title}
                className="w-full h-72 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-white text-4xl font-bold">
                  {courseDetail.title}
                </h1>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Course Overview
              </h2>
              <p className="text-gray-700 mb-6"><strong>Description:</strong> {courseDetail.description}</p>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-600">
                  <strong>Language: </strong>{courseDetail.language}
                </span>
                <span className="text-sm text-gray-600">
                  Price:{" "}
                  <strong className="text-green-600">
                    {courseDetail.pricing.type === "free"
                      ? "Free"
                      : `$${courseDetail.pricing.amount}`}
                  </strong>
                </span>
              </div>
              {courseDetail.thumbnailVideo && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Course Introduction
                  </h3>
                  <video controls className="w-full rounded-lg shadow-md">
                    <source
                      src={courseDetail.thumbnailVideo}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
            {courseDetail.pricing.type === "paid" ? (
              <div className="flex items-center">
              <h1 className="text-xl text-red-600">This is a paid course</h1>
              <button className="bg-blue-600 py-2 px-4 ml-2 rounded-lg text-white">By Now</button>
              </div>
            ) : (
              courseDetail.lessons && courseDetail.lessons.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Course Lessons
                  </h3>
                  <ul className="divide-y divide-gray-200">
                    {courseDetail.lessons.map((lesson) => (
                      <li key={lesson._id} className="py-6">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-lg font-bold text-gray-700">
                              <strong>Title: </strong>{lesson.title}
                            </h4>
                            <p className="text-gray-600"><strong>Description: </strong>{lesson.description}</p>
                            <p className="text-sm text-gray-500">
                              Lesson No: {lesson.lessonNumber}
                            </p>
                          </div>
                          {lesson.lessonVideo && (
                            <div className="ml-4">
                              <video
                                controls
                                className="w-96 rounded-lg shadow-md"
                              >
                                <source
                                  src={lesson.lessonVideo}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </>
        ) : (
          <p className="text-center text-lg text-gray-500">Course not found</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetailPage;
