import React from 'react'

const Pagination = React.memo(({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`mx-1 px-4 py-2 border ${
            index + 1 === currentPage
              ? "bg-gray-800 text-white"
              : "bg-white text-gray-800"
          } rounded-md focus:outline-none`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
});

export default Pagination
