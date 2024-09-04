import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/admin/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { acceptInstructor, fetchUsers, rejectInstructor } from '../../../redux/actions/adminAction';
import { formatDate } from "../../../util/formatDate";
import EmtyData from '../../../components/empty/EmtyData';
import InstructorDetailsModal from './components/InstructorDetailsModal'
// import {Link}  from 'react-router-dom';


const AdminInstructorRequest = () => {
  const dispatch = useDispatch();
  const { instructorsPending, loading, error } = useSelector((state) => state.admin);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const openModal = (instructor) => {
    setSelectedInstructor(instructor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedInstructor(null);
    setIsModalOpen(false);
  };

  const handleAccept = () => {
    if (selectedInstructor) {
      dispatch(acceptInstructor({ id: selectedInstructor._id, email: selectedInstructor.email }));
      closeModal();
      dispatch(fetchUsers());
    }
  };

  const handleReject = (reason) => {
    if (selectedInstructor) {
      console.log('Rejecting instructor:', selectedInstructor.email);
      console.log('Reason for rejection:', reason);
      dispatch(rejectInstructor({ email: selectedInstructor.email, reasons: reason }));
      closeModal();
      dispatch(fetchUsers());
    }
  };

  return (
    <div className="lg:flex">
      <Sidebar />
      <div className="flex-grow p-6 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-6">All Instructor Requests Details</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-4">Welcome to the Instructor requests details!</p>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : instructorsPending.length === 0 ? (
            <EmtyData />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Sl No</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Name</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Email</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Qualification</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Join Date</th>
                    <th className="py-3 px-4 text-left font-semibold text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {instructorsPending.map((instructorPending, index) => (
                    <tr key={instructorPending._id} className="border-b border-gray-200">
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">{instructorPending.firstName || "--"} {instructorPending.lastName || "--"}</td>
                      <td className="py-2 px-4">{instructorPending.email || "--"}</td>
                      <td className="py-2 px-4">{instructorPending.profile.qualification || "--"}</td>
                      <td className="py-2 px-4">{instructorPending.createdAt ? formatDate(instructorPending.createdAt) : "--"}</td>
                      <td className="py-2 px-4">
                        <button 
                          className="bg-green-500 px-4 py-1 rounded" 
                          onClick={() => openModal(instructorPending)}
                        >
                          View
                        </button>
                        {/* <Link to={`/admin/instructorRequest/${instructorPending._id}`} className="px-6">
                            Details
                        </Link> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        
        <InstructorDetailsModal 
          isOpen={isModalOpen}
          onClose={closeModal}
          instructor={selectedInstructor}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      </div>
    </div>
  );
}

export default AdminInstructorRequest;
