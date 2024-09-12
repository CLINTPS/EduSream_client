import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/actions/adminAction";
import { formatDate } from "../../../util/formatDate";
import { URL } from "../../../common/api";
import axios from "axios";
import toast from "react-hot-toast";
import BlockImg from "../../../assets/block&unblock/block.svg";
import UnBlockImg from "../../../assets/block&unblock/unblock.svg";
import EmtyData from "../../../components/empty/EmtyData";
import ConfirmationModal from '../../../components/confirmModal/ConfirmationModal'
import LodingData from "../../../components/lodingData/LodingData";


const AdminInstructor = () => {
  const dispatch = useDispatch();
  const { instructors, loading, error } = useSelector((state) => state.admin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstructore, setSelectedInstructore] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const instructorsPerPage = 3; 
  const totalPages = Math.ceil(instructors.length / instructorsPerPage);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleBlockUnblock = async (id, currentStatus) => {
    if (!selectedInstructore) return;

    try {
      const newStatus = !currentStatus;
      const response = await axios.post(`${URL}/auth/blockUnblockUser`, {
        userId: selectedInstructore._id,
        isBlocked: newStatus,
      });
      if (response.data.isBlocked) {
        toast.error("Instructor Blocked");
      } else {
        toast.success("Instructor Unblocked");
      }
      dispatch(fetchUsers());
    } catch (err) {
      console.error("Error blocking/unblocking user:", err.message);
    }finally {
      setIsModalOpen(false);
      setSelectedInstructore(null);
    }
  };

  const openConfirmationModal = (student) => {
    setSelectedInstructore(student);
    setIsModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsModalOpen(false);
    setSelectedInstructore(null);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * instructorsPerPage;
  const currentInstructors = instructors.slice(
    startIndex,
    startIndex + instructorsPerPage
  );

  return (
    <div className="lg:flex">
      <Sidebar />
      <div className="flex-grow p-6 h-screen bg-gray-100 lg:ml-64">
        <h2 className="text-3xl font-semibold mb-6">Instructor Details</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">Welcome to the Instructor details!</p>

          {loading ? (
            <LodingData/>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : instructors.length === 0 ? (
            <EmtyData/>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">
                      Sl No
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">
                      Email
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">
                      Join Date
                    </th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentInstructors.map((instructor, index) => (
                    <tr
                      key={instructor._id}
                      className="border-b border-gray-200"
                    >
                      <td className="py-2 px-4">{startIndex+index + 1}</td>
                      <td className="py-2 px-4">
                        {instructor.firstName} {instructor.lastName}
                      </td>
                      <td className="py-2 px-4">{instructor.email}</td>
                      <td className="py-2 px-4">
                        {instructor.createdAt
                          ? formatDate(instructor.createdAt)
                          : "N/A"}
                      </td>
                      <td className="py-2 px-4">
                        {/* <button
                      onClick={() => handleBlockUnblock(instructor._id, instructor.email, instructor.isBlocked)}
                      className={`px-4 py-1 rounded ${
                        instructor.isBlocked ? 'bg-red-500' : 'bg-green-500 ml-'
                      } text-white`}
                    >
                      {instructor.isBlocked ? 'Blocked' : 'Active'}
                    </button> */}
                        <img
                          src={instructor.isBlocked ? BlockImg : UnBlockImg}
                          alt={instructor.isBlocked ? "Blocked" : "Active"}
                          // onClick={() =>
                          //   handleBlockUnblock(
                          //     instructor._id,
                          //     instructor.isBlocked
                          //   )
                          // }
                          onClick={() => openConfirmationModal(instructor)}
                          className="w-6 h-6 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
          >
            Previous
          </button>
          <p className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
        
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeConfirmationModal}
        onConfirm={handleBlockUnblock}
        message={`Are you sure you want to ${
          selectedInstructore?.isBlocked ? "unblock" : "block"
        } this student?`}
      />
    </div>
  );
};

export default AdminInstructor;
