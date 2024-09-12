import React, { useState } from 'react'

const RejectionModal = ({ isOpen, onClose, onConfirm }) => {
    const [reason, setReason] = useState('');
  
    const handleConfirm = () => {
      if (reason) {
        onConfirm(reason);
      } else {
        alert("Please select a reason for rejection");
      }
    };
  
    const rejectionReasons = [
      'Incomplete course content',
      'Inappropriate content',
      'Does not meet quality standards',
      'Other'
    ];
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h3 className="text-lg font-semibold mb-4">Reject Course</h3>
          <p className="mb-4">Please select a reason for rejecting this course:</p>
          <select 
            className="w-full p-2 border rounded mb-4" 
            value={reason} 
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="" disabled>Select a reason</option>
            {rejectionReasons.map((reason, index) => (
              <option key={index} value={reason}>{reason}</option>
            ))}
          </select>
          <div className="flex justify-end space-x-2">
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" 
              onClick={handleConfirm}
            >
              Confirm
            </button>
            <button 
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" 
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  

export default RejectionModal
