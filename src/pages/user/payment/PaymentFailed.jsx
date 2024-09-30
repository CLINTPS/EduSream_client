import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-red-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Payment Failed
          </h1>
          <p className="text-gray-600 mt-2">
            Unfortunately, your payment could not be processed.
          </p>

          <button
            onClick={handleRetry}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
