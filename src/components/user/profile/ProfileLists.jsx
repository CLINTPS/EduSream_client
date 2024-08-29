import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserRole } from '../../../redux/actions/userAction';
// import { URL } from '../../../common/api';
// import axios from 'axios';

const ProfileLists = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRoleChange = async (role) => {
    // try {
    //   const response = await axios.post(`${URL}/auth/update-role`, {
    //     role: role,
    //     email: user.email,
    //   });
    //   console.log('Role change response =', response);
    //   setIsModalOpen(false);
    // } catch (error) {
    //   console.error('Error changing role:', error);
    // }
    const response=dispatch(updateUserRole({ role, email: user.email }))
      .then(() => {
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error changing role:', error);
      });
      console.log("Response..",response);
      
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center h-[88vh] bg-gradient-to-r from-blue-100 to-purple-100 space-y-6 py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-6 flex flex-col items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-md"
          />
          <h2 className="mt-4 text-2xl font-bold text-black">{user.firstName || '--'}</h2>
          <p className="text-black text-opacity-75">{user.email || '--'}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
              <p className="mt-2 text-gray-600">Full Name: {user.firstName || '--'}</p>
              <p className="mt-2 text-gray-600">Last Name: {user.lastName || '--'}</p>
              <p className="mt-2 text-gray-600">Role: {user.role || '--'}</p>
              <p className="mt-2 text-gray-600">Join Date: {user.createdAt || '--'}</p>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700">Additional Info</h3>
              <p className="mt-2 text-gray-600">DOB: --</p>
              <p className="text-gray-600">Gender: --</p>
            </div>
          </div>

          <div className="flex justify-end">
            {user.role === 'student' ? (
              <button
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition shadow-md"
                onClick={openModal}
              >
                Become Instructor
              </button>
            ) : user.role === 'pending' ? (
              <p className="mt-4 text-red-600 font-semibold">
                Instructor request is not verified
              </p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full space-y-4">
            <h2 className="text-xl font-semibold text-gray-700">Change Role</h2>
            <p className="text-gray-600">
              Are you sure you want to change your role from Student to Instructor?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={closeModal}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => handleRoleChange('pending')}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileLists;
