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
  const [previewImage, setPreviewImage] = useState(user.profile?.avatar || "");
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [country, setCountry] = useState(user.country || "");
  const [state, setState] = useState(user.state || "");

  console.log("Edit profile user data..",user);
  

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      dob: user.profile?.dob || '',
      gender: user.profile?.gender || '',
      phoneNumber: user.contact?.phoneNumber || '',
      houseName: user.address?.houseName || '',
      street: user.address?.street || '',
      district: user.address?.district || '',
      country: user.address?.country || '',
      state: user.address?.state || '',
      profileImage: user.profile?.avatar || null,
      interestsCategory: user.profile?.interestsCategory || '',
      qualification: user.profile?.qualification || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Must be a valid phone number'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        if (profileImage) {
          const uploadedImageUrl = await ImageUplode(profileImage);
          values.profileImage = uploadedImageUrl;
        }

        const resultAction = await dispatch(userEditProfile(values));
        if (resultAction.meta.requestStatus === "fulfilled") {
          await dispatch(getUserData());
          toast.success("Profile edited successfully.");
          navigate(user.role === "instructor" ? '/instructor/profile' : '/home/profile');
        } else {
          toast.error("Failed to update profile.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }finally {
        setLoading(false); // Step 3: Reset loading state after completion
      }
    },
  });

  useEffect(() => {
    setPreviewImage(user.profile?.avatar);
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file)); 
  };

  const handleCancel = () => {
    navigate(user.role === "instructor" ? '/instructor/profile' : '/home/profile');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="lg:flex">
      <UserSideBar />
      <div className="flex-grow p-6 h-full bg-gray-300 lg:ml-64">
        <h2 className="text-3xl font-bold mb-4">Edit Profile</h2>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              {previewImage ? (
                <img src={previewImage} alt="Profile Preview" className="object-cover w-full h-full" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <input type="file" className="ml-4" accept="image/*" onChange={handleImageChange} />
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
                {formik.errors.firstName && <p className="text-red-500 text-sm">{formik.errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                />
                {formik.errors.lastName && <p className="text-red-500 text-sm">{formik.errors.lastName}</p>}
              </div>

              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="text" 
                  name="email"
                  disabled
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                  value={formik.values.email}
                />
              </div>

              <div>
                <label className="block text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                />
                {formik.errors.phoneNumber && <p className="text-red-500 text-sm">{formik.errors.phoneNumber}</p>}
              </div>

              
              <div>
                <label className="block text-gray-700">Gender</label>
                <select
                  name="gender"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              
              <div>
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  onChange={formik.handleChange}
                  value={formik.values.dob}
                />
              </div>

              
              <div>
                <label className="block text-gray-700">House Name</label>
                <input
                  type="text"
                  name="houseName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  onChange={formik.handleChange}
                  value={formik.values.houseName}
                />
              </div>

              
              <div>
                <label className="block text-gray-700">Street</label>
                <input
                  type="text"
                  name="street"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  onChange={formik.handleChange}
                  value={formik.values.street}
                />
              </div>
              <div>
                <label className="block text-gray-700">District</label>
                <input
                  type="text"
                  name="district"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  onChange={formik.handleChange}
                  value={formik.values.district}
                />
              </div>

              
              <div>
                <label className="block text-gray-700">Country</label>
                <CountryDropdown
                  value={formik.values.country || country}
                  onChange={(val) => {
                    setCountry(val);
                    formik.setFieldValue('country', val);
                  }}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-gray-700">State</label>
                <RegionDropdown
                  country={country}
                  value={state}
                  onChange={(val) => {
                    setState(val);
                    formik.setFieldValue('state', val);
                  }}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-gray-700">Instrasting category</label>
                <select
                  name="interestsCategory"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  onChange={formik.handleChange}
                  value={formik.values.interestsCategory}
                >
                  <option value="">Select Category</option>
                  <option value="Under-graduate">Under-graduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post-graduate">Post-graduate</option>
                </select>
              </div>

              
              <div>
                <label className="block text-gray-700">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  onChange={formik.handleChange}
                  value={formik.values.qualification}
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="mt-2 w-full p-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="mt-2 ml-6 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {loading ? 'Loading...' : 'Save Changes'}
            </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserEditProfile;
