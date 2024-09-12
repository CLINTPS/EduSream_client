import React from 'react';

const LodingData = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] bg-white">
      <div className="relative w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
      
      <p className="mt-4 text-gray-700 text-lg font-medium">Loading...</p>
    </div>
  );
};

export default LodingData;
