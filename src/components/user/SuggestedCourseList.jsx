import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingData from '../../components/lodingData/LodingData';
import Error404 from '../errorPage/Error404';
import { getAllCourses } from '../../redux/actions/courseAction';
import EmtyData from '../empty/EmtyData';

const SuggestedCourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allCourse, loading, error } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(4);

  useEffect(() => {
    if (user?.profile?.interestsCategory) {
      dispatch(
        getAllCourses({
          category: user.profile.interestsCategory,
          page: currentPage,
          limit: coursesPerPage,
        })
      );
    }
  }, [dispatch, user?.profile?.interestsCategory, currentPage]);

  const handleDetailsClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <LoadingData />;
  }

  if (error) {
    return <Error404 />;
  }

  const totalPages = Math.ceil(allCourse?.length / coursesPerPage); 

  return (
    <div className=" bg-gray-200 py-8 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {Array.isArray(allCourse) && allCourse.length > 0 ? (
          allCourse.map((item) => (
            <div
              key={item._id}
              className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 overflow-hidden"
            >
              <img
                src={item.thumbnailImage}
                alt={item.title}
                className="w-full  object-cover cursor-pointer"
                onClick={() => handleDetailsClick(item._id)}
              />
              <div className="p-5">
                <h3 className="text-lg font-bold mb-1 text-gray-800 truncate">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 truncate">
                  {item.description}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {`${item.category} Category`}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-lg font-semibold ${
                      item.pricing.type === 'free'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {item.pricing.type === 'free'
                      ? 'Free'
                      : `Paid: ₹${item.pricing.amount}`}
                  </span>
                  <button
                    onClick={() => handleDetailsClick(item._id)}
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                   View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-lg text-gray-600">
            <EmtyData message={'No suggested courses available'} />
          </p>
        )}
      </div>

      {totalPages > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 border rounded-lg ${
              currentPage === 1
                ? 'text-gray-400 border-gray-300'
                : 'text-blue-600 border-blue-600 hover:bg-blue-100'
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 border rounded-lg ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 border-blue-600 hover:bg-blue-100'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 border rounded-lg ${
              currentPage === totalPages
                ? 'text-gray-400 border-gray-300'
                : 'text-blue-600 border-blue-600 hover:bg-blue-100'
            }`}
          >
            Next
          </button>
        </div>
      )}
      

    </div>
  );
};

export default SuggestedCourseList;
