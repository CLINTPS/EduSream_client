import React,{ useState } from 'react'


const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  if (!isOpen) return null; 

  const handleSubmit = () => {
    if (rating > 0 && review.trim()) {
      onSubmit(rating, review); 
      onClose();
    } else {
      alert("Please provide both rating and review.");
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
      <h3 className="text-2xl font-semibold mb-4">Add Review</h3>

      <label className="block mb-2 text-gray-700">Rating (out of 5)</label>
      <select
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value={0}>Select a rating</option>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      <label className="block mb-2 text-gray-700">Your Review</label>
      <textarea
        className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        rows="4"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <div className="flex justify-end space-x-4">
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={handleSubmit}
        >
          Submit Review
        </button>
      </div>
    </div>
  </div>
);
};

export default ReviewModal
