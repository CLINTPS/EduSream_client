import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LodingData from "../../components/lodingData/LodingData";
import { getCourseById } from "../../redux/actions/userAction";
import UserNav from "../../components/user/UserNav";
import axios from "axios";
import { URL } from "../../common/api";
import { loadStripe } from "@stripe/stripe-js";

const CourseDetailPage = () => {
  const { id } = useParams();
  const { courseDetail, loading, error, isEnrolled  } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.user);
  // console.log("User...........",user);
  console.log("courseDetail...........",courseDetail);
  console.log("isEnrolled...........",isEnrolled);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && id) {
      dispatch(getCourseById({ id, userId: user._id }));
    }
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

  const handlePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Q0dRxRxGaFOTDjM5z8L1nGrgLNv8iGeHCAiup10oiuKD7P7DI9Pc0amB56U42gppYWDw2wAlwVlzR06fnkrxDQO00lSE0JCDu"
    );
    console.log("check handle payment");

    try {
      const data = {
        courseName: courseDetail?.title,
        courseThumbnail: courseDetail?.thumbnailImage,
        amount: courseDetail?.pricing.amount,
        userId: user?._id,
        instructorRef: courseDetail?.instructorRef,
        courseId: courseDetail?._id,
      };
      console.log("DATA>>>>>>>>>>>>>", data);

      const response = await axios.post(
        `${URL}/payment/create-checkout-session`,
        data
      );
      console.log("Response stript...", response);

      const sessionId = response.data.sessionId;
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        console.error("Stripe checkout error:", error);
      }
      
    } catch (error) {
      console.error("Error creating session", error);
    }
  };

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
              <p className="text-gray-700 mb-6">
                <strong>Description:</strong> {courseDetail.description}
              </p>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-600">
                  <strong>Language: </strong>
                  {courseDetail.language}
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

            {/* Conditionally show the "Buy Now" button or "Already Enrolled" */}
            {isEnrolled ? (
              <div className="text-center text-green-500 text-xl font-semibold">
                Already Enrolled
              </div>
            ) : (
              courseDetail.pricing.type === "paid" && (
                <div className="flex items-center justify-end">
                  <button
                    className="bg-gray-600 py-2 px-4 rounded-lg text-white"
                    onClick={handlePayment}
                  >
                    Enroll Now
                  </button>
                </div>
              )
            )}

            {courseDetail.pricing.type === "free" && courseDetail.lessons && (
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
                            <strong>Title: </strong>
                            {lesson.title}
                          </h4>
                          <p className="text-gray-600">
                            <strong>Description: </strong>
                            {lesson.description}
                          </p>
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
