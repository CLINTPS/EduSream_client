import React, { useCallback, useEffect, useState } from "react";
import UserNav from "../../components/user/UserNav";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/actions/courseAction";
import LoadingData from "../../components/lodingData/LodingData";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import IndexNav from "../../components/IndexNav";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import debounce from "lodash/debounce";
import Error404 from "../../components/errorPage/Error404";
import EmtyData from "../../components/empty/EmtyData";
import CourseFilter from "../../components/user/CourseFilter";

const UserCoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allCourse, loading, error, totalCourses, currentPage } = useSelector(
    (state) => state.course
  );
  const { user } = useSelector((state) => state.user);

  console.log("All course page user...",user);
  

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const [suggetionCourse, setSuggetionCourse] = useState("");

  const [showModal, setShowModal] = useState(false); 
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const debouncedSearch = useCallback(
    debounce((query) => {
      dispatch(
        getAllCourses({
          type: filterType,
          category: filterCategory,
          language: filterLanguage,
          search: query,
          page: 1,
          limit: itemsPerPage,
          suggetion: suggetionCourse
        })
      );
    }, 700),
    [dispatch, filterType, filterCategory, filterLanguage,suggetionCourse]
  );

  useEffect(() => {
    dispatch(
      getAllCourses({
        type: filterType,
        category: filterCategory,
        language: filterLanguage,
        search: searchQuery,
        page: page,
        limit: itemsPerPage,
        suggetion: suggetionCourse
      })
    );
  }, [dispatch, filterType, filterCategory, filterLanguage, page,suggetionCourse]);

  const totalPages = totalCourses ? Math.ceil(totalCourses / itemsPerPage) : 0;

  const handleDetailsClick = (courseId) => {
    // if (user) {
      navigate(`/course/${courseId}`);
    // } else {
      // setShowModal(true);
    // }
  };

  const closeLoginModal = () => {
    setShowModal(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
    setPage(1);
  };

  const handleFilterLanguageChange = (e) => {
    setFilterLanguage(e.target.value);
    setPage(1);
  };
  const handleFilterCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setPage(1);
  };

  const handleSuggestionCourse = ()=>{
    setSuggetionCourse(user?.profile.interestsCategory);
    setPage(1)
  }

  const handleThumbnailClick = (videoUrl) => {
    setVideoSrc(videoUrl);
    setVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setVideoModalOpen(false);
    setVideoSrc("");
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  

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
      <div>
        <Error404 />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {user ? <UserNav /> : <IndexNav />}
      {/* <div className="bg-white shadow-md p-5">
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
          className={`transition-all mt-5 lg:mt-0 grid grid-cols-1 lg:grid-cols-4 gap-5 ${
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
              Category
            </label>
            <select
              id="category"
              name="category"
              value={filterCategory}
              onChange={handleFilterCategoryChange}
              className="block w-full p-3 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="">All Category</option>
              <option value="Under-graduate">Under-graduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Post-graduate">Post-graduate</option>
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
      </div> */}

      <CourseFilter
        isFilterOpen={isFilterOpen}
        toggleFilter={toggleFilter}
        filterType={filterType}
        handleFilterTypeChange={handleFilterTypeChange}
        filterCategory={filterCategory}
        handleFilterCategoryChange={handleFilterCategoryChange}
        filterLanguage={filterLanguage}
        handleFilterLanguageChange={handleFilterLanguageChange}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />

      <div className="flex-grow p-8">     
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900">
            All Courses
          </h2>
          {user?.profile.interestsCategory && (
            <button className="bg-gray-300 px-4 py-2 text-gray rounded-lg"
            onClick={handleSuggestionCourse}
            >suggestions</button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.isArray(allCourse) && allCourse.length > 0 ? (
            allCourse.map((item) => (
              <div
                key={item._id}
                className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={item.thumbnailImage}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  onClick={() => handleThumbnailClick(item.thumbnailVideo)}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 truncate">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 truncate">
                    {item.description}
                  </p>
                  <p className="text-gray-600 mb-4 truncate">
                    {`${item.category} category`}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-lg font-semibold ${
                        item.pricing.type === "free"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.pricing.type === "free"
                        ? "Free"
                        : `Paid: $${item.pricing.amount}`}
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
              <EmtyData message={"No course available"} />
            </p>
          )}
        </div>

        {totalPages > 0 && (
          <div className="flex justify-center mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setPage(index + 1)}
                className={`mx-1 px-4 py-2 border ${
                  index + 1 === page
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                } rounded-md focus:outline-none`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-2xl font-semibold text-gray-800 mb-8 text-center">
              Access Restricted
            </p>
            <p className="text-md text-gray-600 mb-6 text-center">
              Please log in to view course details.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={closeLoginModal}
                className="bg-gray-600 text-white px-5 py-2 rounded-full transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Close
              </button>
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-5 py-2 rounded-full transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      )}

      {isVideoModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg w-full relative">
            <button
              onClick={closeVideoModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              X
            </button>
            <video controls className="w-full h-64 object-cover">
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default UserCoursePage;
