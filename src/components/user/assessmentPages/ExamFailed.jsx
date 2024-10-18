import React from 'react'

const ExamFailed = ({ correctAnswers, totalScore, resultStatus,totalExamScore }) => {
    console.log("correctAnswers, totalScore, resultStatus",correctAnswers, totalScore, resultStatus);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! You {resultStatus}</h1>
        <p className="text-gray-600 text-lg mb-6">
          Don't worry! Keep practicing and you'll do better next time.
        </p>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-xl font-semibold text-red-500">Score Summary: {totalScore}/{totalExamScore}</p>
          <p className="text-lg mt-2">
            <span className="font-bold">Correct Answers:</span> {correctAnswers}
          </p>
          <p className="text-lg mt-2">
            <span className="font-bold">Total Score:</span> {totalScore}
          </p>
        </div>
        <button className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
        onClick={()=>alert("Tray again")}
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default ExamFailed
