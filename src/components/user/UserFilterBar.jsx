import React, { useState } from "react";

const UserFilterBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden bg-indigo-600 text-white font-semibold py-2 px-5 rounded-md w-full flex justify-between items-center"
      >
        <span>Filters</span>
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`lg:flex lg:items-center lg:justify-between mt-6 lg:mt-0 ${
          isOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div className="lg:flex-1 mb-5 lg:mb-0 lg:mr-6">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Course Type
          </label>
          <select
            id="type"
            name="type"
            className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50"
          >
            <option value="">All Courses</option>
            <option value="free">Free Courses</option>
            <option value="paid">Paid Courses</option>
          </select>
        </div>

        <div className="lg:flex-1 mb-5 lg:mb-0 lg:mr-6">
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Language
          </label>
          <select
            id="language"
            name="language"
            className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50"
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Hindi">Hindi</option>
          </select>
        </div>

        <div className="lg:flex-1 mb-5 lg:mb-0">
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
            placeholder="Search by title, keyword..."
            className="block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default UserFilterBar;
