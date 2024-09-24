import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { becomeInstructor, getUserData } from "../../../redux/actions/userAction";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import ImageUplode from "../../../util/ImageUplode";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { formatDate } from "../../../util/formatDate";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LodingData from '../../../components/LandingPage/LodingData'

const validationSchema = Yup.object({
  qualification: Yup.string().required("Qualification is required"),
  bio: Yup.string().required("Bio is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  dob: Yup.date().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  experience: Yup.number()
    .required("Experience is required")
    .min(1, "Minimum 1 year"),
  houseName: Yup.string().required("House Name is required"),
  post: Yup.string().required("Post is required"),
  street: Yup.string().required("Street is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  district: Yup.string().required("District is required"),
  idProof: Yup.mixed().required("ID proof is required"),
  certificate: Yup.mixed().required("Certificate is required"),
  linkedIn: Yup.string().url("Invalid URL").notRequired(),
  instagram: Yup.string().url("Invalid URL").notRequired(),
  facebook: Yup.string().url("Invalid URL").notRequired(),
});

const ProfileLists = () => {  
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenInp, setIsModalOpenInp] = useState(false);
  const [idProofFile, setIdProofFile] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [userRole, setUserRole] = useState(user?.role);
  const [loading,setLoding] = useState(false)

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const handleBecomeInstructore = async (role, details) => {
    const formData = { role, email: user.email, ...details };
    // console.log("Form Data......", formData);
      setLoding(true)
    try {
      const response = await dispatch(becomeInstructor(formData));
      console.log("Response..", response);
      
      if (response.meta.requestStatus === "fulfilled") {
        setUserRole("pending");
        console.log("Profile list 111111", response.payload.success);
        toast.success("Instractore request successfully.");
      } else {
        console.log("Profile list 22222", response.payload.message);
        toast.error(response.payload.message);
      }
    } catch (error) {
      console.error("Error changing role:", error);
    }finally {
      setLoding(false)
      setIsModalOpen(false);
      dispatch(getUserData());
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openModalInp = () => setIsModalOpenInp(true);
  const closeModalInp = () => setIsModalOpenInp(false);

  const handleEditProfile = () => {
    // console.log("Edit page check");
    navigate('/home/profile/edit');
  };

  return (
    <div className="flex flex-col space-y-6 py-2">
      <div className="flex justify-center">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl relative">
          <button className="absolute top-4 right-4 px-4 py-2 bg-gray-300 text-black rounded-full hover:bg-gray-400 transition"
          onClick={handleEditProfile}>
            <FaEdit />
          </button>
          
          <div className="bg-gradient-to-r from-gray-200 to-gray-300 p-6 flex flex-col items-center">
            <img
              src={user.profile?.avatar || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-md"
            />
            <h2 className="mt-4 text-2xl font-bold text-black">
              {user.firstName || "--"} {user.lastName || "--"}
            </h2>
            <p className="text-black text-opacity-75">{user.email || "--"}</p>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700">
                  Personal Information
                </h3>
                <p className="mt-1 text-gray-600">
                  Full Name : {user.firstName || "--"}
                </p>
                <p className="mt-1 text-gray-600">
                  Last Name : {user.lastName || "--"}
                </p>
                <p className="mt-1 text-gray-600">
                  DOB : {user.profile.dob ? formatDate(user.profile.dob) : "--"}
                </p>
                <p className="text-gray-600 mt-1">
                  Gender : {user.profile?.gender || "--"}
                </p>
                <p className="text-gray-600 mt-1">
                  Phone No : {user.contact?.phoneNumber || "--"}
                </p>
                <p className="mt-1 text-gray-600">
                  Join Date :{" "}
                  {user.createdAt ? formatDate(user.createdAt) : "--"}
                </p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700">
                  Additional Info
                </h3>
                <p className="text-gray-600 mt-1">
                  House Name : {user.address?.houseName || "--"}
                </p>
                <p className="text-gray-600 mt-1">
                  Country : {user.address?.country || "--"}
                </p>
                <p className="text-gray-600 mt-1">
                  State : {user.address?.state || "--"}
                </p>
                <p className="text-gray-600 mt-1">
                District : {user.address?.district || "--"}
                </p>
                <p className="text-gray-600 mt-1">
                Street : {user.address?.street || "--"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-2">
            <div>
              {user.rejectReson && user.rejectReson.length > 0 && (
                <p className="ml-6 text-red-600">
                  Instructor request is rejected, try again!
                </p>
              )}
            </div>
            {userRole === "student" ? (
              <button
                className="px-4 py-2 mr-6 bg-green-600 text-white rounded-full hover:bg-green-600 transition shadow-md"
                onClick={openModal}
              >
                Become Instructor
              </button>
            ) : userRole === "pending" ? (
              <button
                className="px-2 py-2 mr-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition shadow-md"
                onClick={openModalInp}
              >
                Instructor request status
              </button>
            ) : null}
          </div>
        </div>
          
        {isModalOpen && (
          <div className="fixed inset-1 ml-56 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-auto max-h-[80vh] space-y-4 overflow-auto">
              <h2 className="text-xl font-semibold text-gray-700">
                Instructor Details
              </h2>
              <Formik
                initialValues={{
                  qualification: "",
                  bio: "",
                  phoneNumber: "",
                  dob: "",
                  gender: "",
                  experience: "",
                  linkedIn: "",
                  instagram: "",
                  facebook: "",
                  houseName: "",
                  post: "",
                  street: "",
                  country: "",
                  state: "",
                  district: "",
                  idProof: null,
                  certificate: null,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  const idProofUrl = await ImageUplode(idProofFile);
                  const certificateUrl = await ImageUplode(certificateFile);

                  const updatedValues = {
                    ...values,
                    idProof: idProofUrl,
                    certificate: certificateUrl,
                  };

                  handleBecomeInstructore("pending", updatedValues);
                }}
              >
                
                {({ isSubmitting, setFieldValue }) => (
                  <Form className="space-y-4">
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Qualification
                      </label>
                      <Field
                        name="qualification"
                        type="text"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="qualification"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <Field
                        name="bio"
                        as="textarea"
                        rows="3"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="bio"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <Field
                        name="phoneNumber"
                        type="text"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date of Birth
                      </label>
                      <Field
                        name="dob"
                        type="date"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <Field
                        name="gender"
                        as="select"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      >
                        <option value="" label="Select gender" />
                        <option value="male" label="Male" />
                        <option value="female" label="Female" />
                        <option value="other" label="Other" />
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Experience (Years)
                      </label>
                      <Field
                        name="experience"
                        type="number"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="experience"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        LinkedIn (Optional)
                      </label>
                      <Field
                        name="linkedIn"
                        type="text"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="linkedIn"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Instagram (Optional)
                      </label>
                      <Field
                        name="instagram"
                        type="text"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="instagram"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Facebook (Optional)
                      </label>
                      <Field
                        name="facebook"
                        type="text"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="facebook"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        House Name
                      </label>
                      <Field
                        name="houseName"
                        type="text"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="houseName"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Post
                      </label>
                      <Field
                        name="post"
                        type="text"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="post"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Street
                      </label>
                      <Field
                        name="street"
                        type="text"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="street"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <CountryDropdown
                        value={country}
                        onChange={(val) => {
                          setCountry(val);
                          setFieldValue("country", val);
                        }}
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="country"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        State
                      </label>
                      <RegionDropdown
                        country={country}
                        value={state}
                        onChange={(val) => {
                          setState(val);
                          setFieldValue("state", val);
                        }}
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        District
                      </label>
                      <Field
                        name="district"
                        type="text"
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="district"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        ID Proof
                      </label>
                      <input
                        type="file"
                        onChange={(event) => {
                          setFieldValue(
                            "idProof",
                            event.currentTarget.files[0]
                          );
                          setIdProofFile(event.currentTarget.files[0]);
                        }}
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="idProof"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Certificate
                      </label>
                      <input
                        type="file"
                        onChange={(event) => {
                          setFieldValue(
                            "certificate",
                            event.currentTarget.files[0]
                          );
                          setCertificateFile(event.currentTarget.files[0]);
                        }}
                        className="mt-1 p-2 w-full border border-gray-300 rounded"
                      />
                      <ErrorMessage
                        name="certificate"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                  {loading ? (
                    <LodingData />
                  ) : (
                    <>
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        disabled={isSubmitting || loading}
                      >
                        Submit
                      </button>
                    </>
                  )}
                </div>

                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}

        {isModalOpenInp && (
          <div className="fixed inset-0 flex items-center ml-56 justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-80">
              <h2 className="text-xl font-semibold text-center mb-4">
                Instructor Request Status
              </h2>
              <p className="text-center text-red-600">
                Your request to become an instructor is currently under review.
                Please allow up to 2-3 working days for the verification process
                to be completed. We appreciate your patience and will notify you
                once the review is finished.
              </p>
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  onClick={closeModalInp}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileLists;
