import React from 'react'
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
      navigate('/');
    };

    const handleEnrolledList = ()=> {
      navigate('/home/enrolled-list')
    }
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5-2a9 9 0 11-6.83-6.83A9 9 0 0120 10z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mt-2">
            Your payment has been processed successfully.
          </p>

          <button
            onClick={handleGoHome}
            className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Go to Home
          </button>
          <button
            onClick={handleEnrolledList}
            className="mt-6 ml-1 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Enrolled List
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess
