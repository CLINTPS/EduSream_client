import React from 'react'

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader">Loading...</div>
      <style jsx>{`
        .loader {
          border: 8px solid #f3f3f3;
          border-radius: 50%;
          border-top: 8px solid #3498db;
          width: 60px;
          height: 60px;
          -webkit-animation: spin 2s linear infinite; /* Safari */
          animation: spin 2s linear infinite;
        }

        /* Safari */
        @-webkit-keyframes spin {
          0% {
            -webkit-transform: rotate(0deg);
          }
          100% {
            -webkit-transform: rotate(360deg);
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default Loading
