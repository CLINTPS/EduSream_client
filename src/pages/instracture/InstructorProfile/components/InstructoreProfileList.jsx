import React from 'react';
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { formatDate } from '../../../../util/formatDate';

const InstructorProfileList = () => {
  const { user } = useSelector((state) => state.user);

  if (!user) return <p>Loading...</p>;

  const {
    firstName,
    lastName,
    email,
    profile,
    contact,
    address,
    experience,
    socialMedia,
    role,
  } = user;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl">
      <div className="flex items-start space-x-6 border-b pb-6 mb-6">
        <img
          src={profile.avatar}
          alt="Profile Avatar"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{firstName} {lastName}</h2>
              <p className="text-gray-500">{role}</p>
            </div>
            <button className="flex items-center justify-center p-2 rounded-full hover:bg-black hover:text-white transition">
              <FaEdit size={26} />
            </button>
          </div>
          <p className="mt-4 text-gray-700">
            <span className="font-medium">Bio:</span> {profile.bio}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Personal Information</h3>
            <p className="text-gray-600"><span className="font-medium">First Name:</span> {firstName}</p>
            <p className="text-gray-600"><span className="font-medium">Last Name:</span> {lastName}</p>
            <p className="text-gray-600"><span className="font-medium">Email:</span> {email}</p>
            <p className="text-gray-600"><span className="font-medium">Phone:</span> {contact.phoneNumber || '--'}</p>
            <p className="text-gray-600"><span className="font-medium">Date of Birth:</span> {profile.dob ? formatDate(profile.dob) : "--"}</p>
            <p className="text-gray-600"><span className="font-medium">Gender:</span> {profile.gender}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Address</h3>
            <p className="text-gray-600">{`${address.houseName}`}</p>
            <p className="text-gray-600">{`${address.street}, ${address.post}`}</p>
            <p className="text-gray-600">{`${address.state}, ${address.country}`}</p>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-2">Qualification & Experience</h3>
          <p className="text-gray-600"><span className="font-medium">Qualification:</span> {profile.qualification}</p>
          <p className="text-gray-600"><span className="font-medium">Experience:</span> {experience} years</p>
        </div>

        {socialMedia && (socialMedia.linkedIn || socialMedia.instagram || socialMedia.facebook) && (
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Social Media</h3>
            <div className="flex space-x-4">
              {socialMedia.linkedIn && (
                <a href={socialMedia.linkedIn} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              )}
              {socialMedia.instagram && (
                <a href={socialMedia.instagram} className="text-pink-500 hover:underline" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              )}
              {socialMedia.facebook && (
                <a href={socialMedia.facebook} className="text-blue-800 hover:underline" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorProfileList;
