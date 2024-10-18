import React from 'react'
import { useNavigate } from 'react-router-dom';

const ExamPass = ({ correctAnswers, totalScore, resultStatus,totalExamScore }) => {
  const navigate = useNavigate();
    // console.log("correctAnswers, totalScore, resultStatus",correctAnswers, totalScore, resultStatus);
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-4">Congratulations! You {resultStatus}</h1>
          <p className="text-gray-600 text-lg mb-6">
            Well done! You've passed the exam. Keep up the great work and continue to improve your skills.
          </p>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-xl font-semibold text-green-500">Your Score: {totalScore}/{totalExamScore}</p>
            <p className="text-lg mt-2">
              <span className="font-bold">Correct Answers:</span> {correctAnswers}
            </p>
            <p className="text-lg mt-2">
              <span className="font-bold">Total Score:</span> {totalScore}
            </p>
          </div>
          <button
            className="mt-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
            onClick={() => navigate('/home/result-certificate')}
          >
            Result & Certificate
          </button>
        </div>
      </div>
    );
  };

export default ExamPass
