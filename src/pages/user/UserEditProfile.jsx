import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import UserSideBar from '../../components/user/UserSidebar';
import ImageUplode from "../../util/ImageUplode";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { getUserData, userEditProfile } from '../../redux/actions/userAction';
import toast from 'react-hot-toast';

const UserEditProfile = () => {
  const { user } = useSelector((state) => state.user);

  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [country, setCountry] = useState(user.country || "");
  const [state, setState] = useState(user.state || "");

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      houseName: user.houseName,
      street: user.street,
      district: user.district,
      country: user.country,
      state: user.state,
      profileImage: user.profile?.avatar || null,
    },
    enableReinitialize: true, 
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Must be a valid phone number'),
    }),
    onSubmit: async (values) => {
      try {
        if (profileImage) {
          const uploadedImageUrl = await ImageUplode(profileImage);
          values.profileImage = uploadedImageUrl;
        }

        const resultAction = await dispatch(userEditProfile(values));
        if (resultAction.meta.requestStatus === "fulfilled") {
          await dispatch(getUserData());
          toast.success("Profile edited successfully.");
          navigate('/home/profile');
        } else {
          toast.error("Failed to update profile.");
          console.error("Failed to update profile:", resultAction.payload);
        }

      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
  });

  useEffect(() => {
    console.log("User data:", user);
    formik.setValues({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dob: user.dob,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      houseName: user.houseName,
      street: user.street,
      district: user.district,
      country: user.country,
      state: user.state,
      profileImage: user.profile?.avatar,
    });
    setCountry(user.country || "");
    setState(user.state || ""); 
  }, [user]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    formik.setFieldValue('profileImage', e.target.files[0]);
  };

  const handleCancel = () => {
    navigate('/home/profile');
  };

  return (
    <div className="lg:flex ">
      <UserSideBar />
      <div className="flex-grow p-6 bg-gray-300">
        <h2 className="text-3xl font-bold mb-2">User Edit Profile</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                />
                 {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  disabled
                  value={formik.values.email}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dob}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                  Gender
                </label>
                <select
                  name="gender"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="houseName">
                  House Name
                </label>
                <input
                  type="text"
                  name="houseName"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.houseName}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="street">
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.street}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="district">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.district}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                  Country
                </label>
                <CountryDropdown
                  value={country}
                  onChange={(val) => {
                    setCountry(val);
                    formik.setFieldValue('country', val);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                  State
                </label>
                <RegionDropdown
                  country={country}
                  value={state}
                  onChange={(val) => {
                    setState(val);
                    formik.setFieldValue('state', val);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profileImage">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditProfile;
