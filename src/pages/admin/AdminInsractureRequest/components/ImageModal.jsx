import React from 'react'

const ImageModal = ({ isOpen, onClose, imageUrl, title }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-sm">
          <h3 className="text-lg font-bold mb-4">{title}</h3>
          <img src={imageUrl} alt={title} className="w-full h-auto rounded mb-4" />
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

export default ImageModal
