import React, { useState } from 'react';
import { formatDate } from '../../../../util/formatDate';
import RejectionModal from './RejectionModal';
import ImageModal from './ImageModal';

const InstructorDetailsModal = ({ isOpen, onClose, instructor, onAccept, onReject }) => {
  const [isReasonModalOpen, setIsReasonModalOpen] = useState(false);
  const [imageModal, setImageModal] = useState({ isOpen: false, imageUrl: '', title: '' });

  const handleRejectClick = () => {
    setIsReasonModalOpen(true);
  };

  const handleReasonSubmit = (reason) => {
    // console.log("Selected reasons for rejection:", reason);
    onReject(reason);
  };

  const openImageModal = (imageUrl, title) => {
    setImageModal({ isOpen: true, imageUrl, title });
  };

  const closeImageModal = () => {
    setImageModal({ isOpen: false, imageUrl: '', title: '' });
  };

  
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Instructor Details</h3>
            <p><strong>Name:</strong> {instructor.firstName} {instructor.lastName}</p>
            <p><strong>Email:</strong> {instructor.email}</p>
            <p><strong>Qualification:</strong> {instructor.profile.qualification}</p>
            <p><strong>Bio:</strong> {instructor.profile.bio}</p>
            <p><strong>Phone Number:</strong> {instructor.contact.phoneNumber || "--"}</p>
            <p><strong>Date of Birth:</strong> {instructor.profile.dob ? formatDate(instructor.profile.dob) : '--'}</p>
            <p><strong>Experience:</strong> {instructor.profile.experience} years</p>
            <p><strong>Gender:</strong> {instructor.profile.gender}</p>
            <p><strong>Profession:</strong> {instructor.profession}</p>

          
            <div className="mt-4">
              <h4 className="font-bold mb-2">Social Media Links:</h4>
              {instructor.contact.socialMedia && (
                <ul>
                  {instructor.contact.socialMedia.instagram && <li>Instagram: {instructor.contact.socialMedia.instagram}</li>}
                  {instructor.contact.socialMedia.linkedIn && <li>LinkedIn: {instructor.contact.socialMedia.linkedIn}</li>}
                  {instructor.contact.socialMedia.facebook && <li>Facebook: {instructor.contact.socialMedia.facebook}</li>}
                </ul>
              )}
            </div>


            <div className="mt-4">
              <h4 className="font-bold mb-2">Address:</h4>
              {instructor.address && (
                <p>
                  {instructor.address.houseName && <span>{instructor.address.houseName}, </span>}
                  {instructor.address.post && <span>{instructor.address.post}, </span>}
                  {instructor.address.street && <span>{instructor.address.street}, </span>}
                  {instructor.address.district && <span>{instructor.address.district}, </span>}
                  {instructor.address.state && <span>{instructor.address.state}, </span>}
                  {instructor.address.country && <span>{instructor.address.country}</span>}
                </p>
              )}
            </div>

            <div className="mt-4">
              <h4 className="font-bold mb-2">Instructor Proof:</h4>
              {instructor.instructoreProof && (
                <ul>
                  {instructor.instructoreProof.idProof && (
                    <li>
                      ID Proof: 
                      <button
                        className="text-blue-500 underline ml-1"
                        onClick={() => openImageModal(instructor.instructoreProof.idProof, 'ID Proof')}
                      >
                        View ID Proof
                      </button>
                    </li>
                  )}
                  {instructor.instructoreProof.certificate && (
                    <li>
                      Certificate: 
                      <button
                        className="text-blue-500 underline ml-1"
                        onClick={() => openImageModal(instructor.instructoreProof.certificate, 'Certificate')}
                      >
                        View Certificate
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mr-2"
                onClick={onAccept}
              >
                Accept
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded mr-2"
                onClick={handleRejectClick}
              >
                Reject
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <RejectionModal
        isOpen={isReasonModalOpen}
        onClose={() => setIsReasonModalOpen(false)}
        onSubmit={handleReasonSubmit}
      />

      <ImageModal
        isOpen={imageModal.isOpen}
        onClose={closeImageModal}
        imageUrl={imageModal.imageUrl}
        title={imageModal.title}
      />
    </>
  );
};

export default InstructorDetailsModal;
