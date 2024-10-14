import React from 'react'

const CourseListCard = React.memo(({ courses, onDetailsClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {Array.isArray(courses) && courses.length > 0 ? (
        courses.map((item) => (
          <div
            key={item._id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={item.thumbnailImage}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4 truncate">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">
                  {item.pricing.type === "free"
                    ? "Free"
                    : `$${item.pricing.amount}`}
                </span>
                <button
                  onClick={() => onDetailsClick(item._id)}
                  className="text-blue-500 hover:underline"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-lg text-gray-600">
          No courses available
        </p>
      )}
    </div>
  );
});

export default CourseListCard
