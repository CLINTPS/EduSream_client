import React, { useState } from 'react';

const reasonsList = [
  "Insufficient qualifications",
  "Incomplete profile information",
  "Unclear bio description",
  "Lack of teaching experience",
  "Invalid contact information",
];

const RejectionModal = ({ isOpen, onClose, onSubmit }) => {
    const [selectedReasons, setSelectedReasons] = useState([]);

  const handleCheckboxChange = (reason) => {
    setSelectedReasons((prevSelected) =>
      prevSelected.includes(reason)
        ? prevSelected.filter((r) => r !== reason)
        : [...prevSelected, reason]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedReasons);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Reason for Rejection</h3>
        <div className="mb-4">
          {reasonsList.map((reason) => (
            <div key={reason} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={reason}
                checked={selectedReasons.includes(reason)}
                onChange={() => handleCheckboxChange(reason)}
                className="mr-2"
              />
              <label htmlFor={reason} className="text-gray-800">{reason}</label>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default RejectionModal
