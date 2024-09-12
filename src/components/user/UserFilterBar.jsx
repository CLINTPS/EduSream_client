import React, { useState } from "react";

const UserFilterBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-blue-500 font-semibold mb-4 w-full text-left flex items-center justify-between"
      >
        <span>Filters</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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

      <div className={`lg:flex lg:items-center lg:justify-between ${isOpen ? "block" : "hidden lg:block"}`}>

        <div className="mb-4 lg:mb-0 lg:flex-1">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <select
            id="price"
            name="price"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Prices</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        <div className="mb-4 lg:mb-0 lg:flex-1 lg:mr-4">
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            id="language"
            name="language"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Languages</option>
          </select>
        </div>

        <div className="mb-4 lg:mb-0 lg:flex-1 lg:mr-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <select
            id="category"
            name="category"
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select Range</option>
            <option value="">Low To High</option>
            <option value="">High To Low</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default UserFilterBar;
