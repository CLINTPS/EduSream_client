import React from 'react'

const EmtyData = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] bg-gray-50">
          
          <div className="relative w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center animate-bounce">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 15a4 4 0 006.92 2.36L12 15m0 0l2.08-2.36A4 4 0 0015 9m0 0l3.92-1.64M15 9l-3-3 1-3 3 3m4 3.16l-2 2.34M7 13h10"
              />
            </svg>
          </div>
          
          <p className="mt-4 text-gray-700 text-lg font-medium">No Data Found</p>
        </div>
      );
}

export default EmtyData
