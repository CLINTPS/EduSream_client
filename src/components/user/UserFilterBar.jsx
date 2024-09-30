// import React, { useState } from "react";
// import { FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";

// const UserFilterBar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="lg:hidden bg-gray-800 text-white font-medium py-3 px-5 rounded-lg w-full flex justify-between items-center"
//       >
//         <span>Filter Options</span>
//         {isOpen ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
//       </button>

//       <div
//         className={`transition-all mt-5 lg:mt-0 grid grid-cols-1 lg:grid-cols-3 gap-5 ${
//           isOpen ? "block" : "hidden lg:grid"
//         }`}
//       >
//         <div className="bg-gray-50 border border-gray-300 rounded-md p-4">
//           <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
//             Course Type
//           </label>
//           <select
//             id="type"
//             name="type"
//             className="block w-full p-3 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
//           >
//             <option value="">All Courses</option>
//             <option value="free">Free Courses</option>
//             <option value="paid">Paid Courses</option>
//           </select>
//         </div>

//         <div className="bg-gray-50 border border-gray-300 rounded-md p-4">
//           <label
//             htmlFor="language"
//             className="block text-sm font-medium text-gray-700 mb-2"
//           >
//             Language
//           </label>
//           <select
//             id="language"
//             name="language"
//             className="block w-full p-3 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
//           >
//             <option value="">All Languages</option>
//             <option value="English">English</option>
//             <option value="Malayalam">Malayalam</option>
//             <option value="Hindi">Hindi</option>
//           </select>
//         </div>

//         <div className="bg-gray-50 border border-gray-300 rounded-md p-4 flex items-center">
//           <div className="flex-grow">
//             <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
//               Search
//             </label>
//             <input
//               type="text"
//               id="search"
//               name="search"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               placeholder="Search courses..."
//               className="block w-full p-3 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserFilterBar;
