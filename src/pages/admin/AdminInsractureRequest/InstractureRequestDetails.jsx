// import React, { useEffect } from 'react'
// import Sidebar from '../../../components/admin/Sidebar'
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { fetchInstructorById } from '../../../redux/actions/adminAction';

// const InstractureRequestDetails = () => {
//   const { id } = useParams(); 
//   console.log(id);

//   const dispatch = useDispatch();
//    const { selectedInstructor, loading, error } = useSelector((state) => state.admin);

//    console.log("selectedInstructor",selectedInstructor);
   

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchInstructorById(id));
//     }
//   }, [dispatch, id]);

//   // if (loading) {
//   //   return <p>Loading...</p>;
//   // }

//   // if (error) {
//   //   return <p className="text-red-500">Error: {error}</p>;
//   // }

//   // if (!selectedInstructor) {
//   //   return <p>No instructor data available.</p>;
//   // }

//   return (
//     <div className="lg:flex">
//       <Sidebar />
//       <div className="flex-grow p-6 bg-gray-100 lg:ml-64">
//         <h2 className="text-3xl font-semibold mb-6">Instructor Full Details</h2>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <p className="mb-4">Welcome to the Instructor full details!</p>
//             <div className="overflow-x-auto">
//               <p><strong>Name:</strong> {selectedInstructor.firstName} {selectedInstructor.lastName}</p>
//               <p><strong>Email:</strong> {selectedInstructor.email}</p>
//               <p><strong>Qualification:</strong> {selectedInstructor.profile.qualification}</p>
//               <p><strong>Bio:</strong> {selectedInstructor.profile.bio}</p>
//               <p><strong>Phone Number:</strong> {selectedInstructor.profile.phoneNumber}</p>
//               <p><strong>Date of Birth:</strong> {selectedInstructor.profile.dob ? formatDate(selectedInstructor.profile.dob) : '--'}</p>
//               <p><strong>Experience:</strong> {selectedInstructor.profile.experience} years</p>
//               <p><strong>Join Date:</strong> {selectedInstructor.createdAt ? formatDate(selectedInstructor.createdAt) : '--'}</p>
//             </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default InstractureRequestDetails
