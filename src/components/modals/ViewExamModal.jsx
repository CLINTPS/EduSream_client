import React from "react";
import Modal from "react-modal";

const ViewExamModal = ({ isOpen, onClose, exam }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-3xl font-semibold text-gray-800">Qestions & Answers</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-6">
          <div className="mb-4">
            <p className="text-lg font-medium text-gray-600"><strong>Title:</strong> {exam.title}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <p className="text-lg"><strong>Total Score:</strong> {exam.totalScore}</p>
            <p className="text-lg"><strong>Passing Score:</strong> {exam.passingScore}</p>
            <p className="text-lg"><strong>Question Score:</strong> {exam.questionScore}</p>
          </div>

          <h3 className="mt-6 text-xl font-medium text-gray-800 border-b pb-2">Questions</h3>
          

          <div className="mt-4 max-h-64 overflow-y-auto">
            {exam.questions.map((q, index) => (
              <div key={index} className="mt-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                <p className="text-lg"><strong>Question {index + 1}:</strong> {q.question}</p>
                <p className="mt-2 text-gray-700"><strong>Options:</strong> {q.options.join(", ")}</p>
                <p className="mt-1 text-gray-700"><strong>Answer:</strong> {q.answer}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={onClose}
              className="px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewExamModal;
