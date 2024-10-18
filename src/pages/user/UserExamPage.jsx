import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { URL } from "../../common/api";
import UserSideBar from "../../components/user/UserSidebar";
import EmtyData from "../../components/empty/EmtyData";
import axios from "axios";
import { config } from "../../common/configurations";
import { useSelector } from "react-redux";
import ExamPass from "../../components/user/assessmentPages/ExamPass";
import ExamFailed from "../../components/user/assessmentPages/ExamFailed";

const UserExamPage = () => {
  const { user } = useSelector((state) => state.user);
  const { state } = useLocation();
  const navigate = useNavigate();
  const examDetails = state?.examDetails;
  const courseId = state?.courseId;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [examResult, setExamResult] = useState(null);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const { title, questionScore, passingScore, totalScore, questions } =
    examDetails;
  // console.log(".............................exma", examDetails);
  // console.log(".............................course", courseId);
  // console.log(".............................user", user);

  const handleOptionChange = (option) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const dataToSend = {
      userId: user._id,
      examId: examDetails._id,
      courseId:courseId,
      answers: selectedAnswers.map((answer, index) => ({
        questionId: questions[index]._id,
        selectedAnswer: answer,
      })),
    };

    try {
      console.log("Current result", dataToSend);

      const response = await axios.post(
        `${URL}/course/submit-assessment`,
        dataToSend,
        config
      );
      console.log("Assessment result response", response);
      if (response.data) {
        setExamResult(response.data.data);
      }
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  if (!examDetails) {
    return (
      <div className="lg:flex">
        <UserSideBar />
        <div className="flex-grow p-6 h-screen bg-gray-300 lg:ml-64">
          <h2 className="text-3xl font-bold mb-6">Enrolled Course</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <EmtyData message={"No Exam Found"} />
          </div>
        </div>
      </div>
    );
  }
  console.log("Exam result data", examResult);

  return (
    <div className="lg:flex min-h-screen bg-gray-100">
      <UserSideBar className="lg:w-1/5" />
      <div className="flex-grow p-6 lg:ml-64">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 border-b-2 border-gray-300 pb-4">
          {title || "Examination"}
        </h2>
        {examResult ? (
          examResult.resultStatus === "Passed" ? (
            <ExamPass
              correctAnswers={examResult.correctAnswers}
              totalScore={examResult.totalScore}
              totalExamScore={totalScore}
            />
          ) : (
            <ExamFailed
              correctAnswers={examResult.correctAnswers}
              totalScore={examResult.totalScore}
              totalExamScore={totalScore}
            />
          )
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <p className="text-lg font-medium text-gray-700">
                  Question Score:{" "}
                  <span className="font-bold">{questionScore}</span>
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <p className="text-lg font-medium text-gray-700">
                  Passing Score:{" "}
                  <span className="font-bold">{passingScore}</span>
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <p className="text-lg font-medium text-gray-700">
                  Total Score: <span className="font-bold">{totalScore}</span>
                </p>
              </div>
            </div>

            <div className="mt-8">
              {currentQuestionIndex < questions.length ? (
                <div className="mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Question {currentQuestionIndex + 1} :{" "}
                    {questions[currentQuestionIndex].question}
                  </h2>

                  <div className="space-y-6">
                    {questions[currentQuestionIndex].options.map(
                      (option, index) => (
                        <div
                          key={index}
                          className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-200 ease-in-out"
                        >
                          <input
                            type="radio"
                            name="question"
                            value={option}
                            onChange={() => handleOptionChange(option)}
                            checked={
                              selectedAnswers[currentQuestionIndex] === option
                            }
                            className="h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label className="ml-3 text-lg text-gray-800">
                            {option}
                          </label>
                        </div>
                      )
                    )}
                  </div>

                  <div className="flex justify-between mt-2">
                    <button
                      className="bg-gray-500 w-full text-white py-2 px-4 rounded"
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Back
                    </button>

                    <button
                      className="bg-blue-500 w-full ml-2 text-white py-2 px-4 rounded"
                      onClick={handleNextQuestion}
                      disabled={!selectedAnswers[currentQuestionIndex]}
                    >
                      {currentQuestionIndex < questions.length - 1
                        ? "Next"
                        : "Submit"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center mt-10 p-8 bg-green-50 rounded-lg shadow-lg">
                  <h2 className="text-3xl font-semibold text-gray-800 mb-6">
                    Exam Completed!
                  </h2>
                  <p className="text-xl text-gray-600 mb-6">
                    Your answers have been submitted.
                  </p>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg transition duration-300 ease-in-out"
                    onClick={handleSubmit}
                  >
                    Submit Exam
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserExamPage;
