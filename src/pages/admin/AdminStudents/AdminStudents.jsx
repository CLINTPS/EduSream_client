import React, { useEffect } from 'react'
import Sidebar from '../../../components/admin/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../redux/actions/adminAction';
import { formatDate } from '../../../util/formatDate'
import axios from 'axios';
import { URL } from '../../../common/api';
import toast from "react-hot-toast";
import BlockImg from '../../../assets/block&unblock/block.svg'
import UnBlockImg from '../../../assets/block&unblock/unblock.svg'
import EmtyData from '../../../components/empty/EmtyData';


const AdminStudents = () => {
  const dispatch = useDispatch();
    const { students, loading, error } = useSelector(state => state.admin);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleBlockUnblock = async (id, currentStatus) => {
        try {
          const newStatus  = !currentStatus;
          const response = await axios.post(`${URL}/auth/blockUnblockUser`, {
              userId: id,
              isBlocked: newStatus ,
          });
          if(response.data.isBlocked){
            toast.error("Student Blocked")
          }else{
            toast.success("Student Unblocked")
          };
          dispatch(fetchUsers());

      } catch (err) {
          console.error("Error blocking/unblocking user:", err.message);
      }
        
    };


  return (
    <div className="lg:flex">
  <Sidebar />
  <div className="flex-grow p-6 bg-gray-100">
    <h2 className="text-3xl font-semibold mb-6">Students Details</h2>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="mb-4">Welcome to the students details!</p>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : students.length === 0 ? (
        <EmtyData/>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="py-3 px-4 text-left font-semibold text-gray-600">Sl No</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">Name</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">Email</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">Join Date</th>
                <th className="py-3 px-4 text-left font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student._id} className="border-b border-gray-200">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="py-2 px-4">{student.email}</td>
                  <td className="py-2 px-4">
                    {student.createdAt ? formatDate(student.createdAt) : 'N/A'}
                  </td>
                  <td className="py-2 px-4">
                    {/* <button
                      onClick={() => handleBlockUnblock(student._id, student.email, student.isBlocked)}
                      className={`px-4 py-1 rounded ${
                        student.isBlocked ? 'bg-red-500' : 'bg-green-500 ml-'
                      } text-white`}
                    >
                      {student.isBlocked ? 'Blocked' : 'Active'}
                    </button> */}
                     <img
                          src={student.isBlocked ? BlockImg : UnBlockImg}
                          alt={student.isBlocked ? 'Blocked' : 'Active'}
                          onClick={() => handleBlockUnblock(student._id, student.isBlocked)}
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
  </div>
</div>
  );
};

export default AdminStudents
