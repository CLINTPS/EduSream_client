import React from 'react'

const CourseDeailsModal = ({ isOpen, onClose, course }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-xl font-semibold mb-4">Course Details</h2>
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            &times;
          </button>
          <div>
            <p><strong>Title:</strong> {course.title || 'N/A'}</p>
            <p><strong>Instructor ID:</strong> {course.instructorRef || 'N/A'}</p>
            <p><strong>Language:</strong> {course.language || 'N/A'}</p>
            <p><strong>Created At:</strong> {course.createdAt ? formatDate(course.createdAt) : 'N/A'}</p>
            <p><strong>Description:</strong> {course.description || 'N/A'}</p>
          </div>
        </div>
      </div>
    );
  };
  
  const formatDate = (date) => new Date(date).toLocaleDateString();
  

export default CourseDeailsModal
