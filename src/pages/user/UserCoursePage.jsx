import React, { useEffect, useState } from "react";
import UserNav from "../../components/user/UserNav";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/actions/courseAction";
import LoadingData from "../../components/lodingData/LodingData";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import IndexNav from "../../components/IndexNav";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const UserCoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allCourse, loading, error } = useSelector((state) => state.course);
  const { user } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const handleDetailsClick = (courseId) => {
    if (user) {
      navigate(`/home/course/${courseId}`);
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setCurrentPage(1); 
  };

  const handleFilterLanguageChange = (e) => {
    setFilterLanguage(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredCourses = allCourse.filter((course) => {
    const matchesType =
      filterType === "" || course.pricing.type === filterType;
    const matchesLanguage =
      filterLanguage === "" || course.language === filterLanguage;
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesLanguage && matchesSearch;
  });

  const indexOfLastCourse = currentPage * itemsPerPage;
  const indexOfFirstCourse = indexOfLastCourse - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);

  if (loading) {
    return (
      <div>
        {user ? <UserNav /> : <IndexNav />}
        <LoadingData />
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {user ? <UserNav /> : <IndexNav />}

      <div className="bg-white shadow-md p-5">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden bg-gray-800 text-white font-medium py-3 px-5 rounded-lg w-full flex justify-between items-center"
        >
          <span>Filter Options</span>
          {isFilterOpen ? (
            <FiChevronUp className="ml-2" />
          ) : (
            <FiChevronDown className="ml-2" />
          )}
        </button>

        <div
          className={`transition-all mt-5 lg:mt-0 grid grid-cols-1 lg:grid-cols-3 gap-5 ${
            isFilterOpen ? "block" : "hidden lg:grid"
          }`}
        >
          <div className="bg-gray-50 border border-gray-300 rounded-md p-4">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Course Type
            </label>
            <select
              id="type"
              name="type"
              value={filterType}
              onChange={handleFilterTypeChange}
              className="block w-full p-3 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">All Courses</option>
              <option value="free">Free Courses</option>
              <option value="paid">Paid Courses</option>
            </select>
          </div>

       
          <div className="bg-gray-50 border border-gray-300 rounded-md p-4">
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Language
            </label>
            <select
              id="language"
              name="language"
              value={filterLanguage}
              onChange={handleFilterLanguageChange}
              className="block w-full p-3 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">All Languages</option>
              <option value="English">English</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>

          <div className="bg-gray-50 border border-gray-300 rounded-md p-4 flex items-center">
            <div className="flex-grow">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Search
              </label>
              <input
                type="text"
                id="search"
                name="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search courses..."
                className="block w-full p-3 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow p-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
          All Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentCourses.length > 0 ? (
            currentCourses.map((item) => (
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
                      onClick={() => handleDetailsClick(item._id)}
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

        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-2 px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } transition-colors duration-200`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Login Required</h2>
            <p className="mb-4">
              You need to log in to view the course details.
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Back
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default UserCoursePage;
