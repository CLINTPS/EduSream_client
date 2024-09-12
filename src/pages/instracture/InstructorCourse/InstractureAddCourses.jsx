import React from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import InstructorSidebar from "../../../components/instrcture/InstructorSidebar";
import ImageUpload from "./components/ImageUpload";
import VideoUplodeThumbnail from "./components/VideoUplodeThumbnail";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse } from "../../../redux/actions/courseAction";  
import toast from "react-hot-toast";

const courseSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  thumbnailImage: Yup.string().required("Thumbnail image is required"),
  thumbnailVideo: Yup.string().required("Thumbnail Video is required"),
  language: Yup.string(),
  lessons: Yup.array().of(
    Yup.object().shape({
      lessonNumber: Yup.string().required("Lesson number is required"),
      title: Yup.string().required("Lesson title is required"),
      description: Yup.string().required("Lesson description is required"),
      lessonVideo: Yup.string().required("Lesson video URL is required"),
    })
  ),
    // pricing: Yup.object().shape({
    //   type: Yup.string().oneOf(["free", "paid"]).default("free"),
    //   amount: Yup.number().when("type", {
    //     is: "paid",
    //     then: Yup.number().required("Amount is required"),
    //   }),
    // }),
});

const InstractureAddCourses = () => {
  const {user} = useSelector((state)=>state.user)
  console.log("Instructore",user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values,setSubmitting) => {
      console.log("Values.......",values);
      console.log("setSubmitting.......",setSubmitting);
      try {
        const courseData = { ...values, instructorRef: user._id }; 
        console.log("courseData.......",courseData);
        const response = await dispatch(addNewCourse(courseData))
        console.log("submitting form response :", response);
        if(response.meta.requestStatus === "fulfilled"){
          toast.success("Course creation successfully.");
          navigate("/instructor/courses");
        }else{
          toast.error("Failed to Course creation.");
          console.error("Failed to Course creation:", response.payload);
        }

      }  catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setSubmitting(false);
      }
  }

  const handleCancel = () => {
    navigate("/instructor/courses");
  };

  return (
    <div className="lg:flex">
      <InstructorSidebar />
      <div className="flex-grow p-6 bg-gray-100 lg:ml-64">
        <h2 className="text-3xl font-semibold mb-6">Add New Courses</h2>
        <Formik
          initialValues={{
            title: "",
            description: "",
            thumbnailImage: "",
            thumbnailVideo: "",
            language: "english",
            lessons: [
              {
                lessonNumber: "",
                title: "",
                description: "",
                lessonVideo: "",
              },
            ],
            pricing: { type: "free", amount: 0 },
          }}
          validationSchema={courseSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Submitted Values:", values);
            handleSubmit(values,(setSubmitting))
          }}
        >
          {({ values, isSubmitting, setFieldValue }) => (
             <Form>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course Title
                </label>
                <Field
                  name="title"
                  type="text"
                  placeholder="Course Title" 
                  className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course Description
                </label>
                <Field
                  name="description"
                  as="textarea"
                  placeholder="Course Description"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <ImageUpload
                name="thumbnailImage"
                label="Course Thumbnail Image"
                setFieldValue={setFieldValue}
              />
              <VideoUplodeThumbnail
                name="thumbnailVideo"
                label="Course Thumbnail Video"
                setFieldValue={setFieldValue}
              />

              {/* <div className="mb-4">
                <label
                  htmlFor="categoryRef"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <Field
                  name="categoryRef"
                  as="select"
                  className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">Select Category</option>
                  <option value="Under-graduate">Under-graduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post-graduate">Post-graduate</option>
                </Field>
                <ErrorMessage
                  name="categoryRef"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div> */}

              <div className="mb-4">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <Field
                  name="language"
                  as="select"
                  className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="">Select language</option>
                  <option value="English">English</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Hindi">Hindi</option>
                </Field>
                <ErrorMessage
                  name="language"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>


              <FieldArray name="lessons">
                {({ insert, remove, push }) => (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Lessons</h3>
                    {values.lessons.map((lesson, index) => (
                      <div key={index} className="border p-4 mb-4 rounded-md">
                        <h4 className="font-medium text-lg">
                          Lesson {index + 1}
                        </h4>
                        <div className="mb-4">
                          <label
                            htmlFor={`lessons.${index}.lessonNumber`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Lesson Number
                          </label>
                          <Field
                            name={`lessons.${index}.lessonNumber`}
                            type="text"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                          />
                          <ErrorMessage
                            name={`lessons.${index}.lessonNumber`}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor={`lessons.${index}.title`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Lesson Title
                          </label>
                          <Field
                            name={`lessons.${index}.title`}
                            type="text"
                            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                          />
                          <ErrorMessage
                            name={`lessons.${index}.title`}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor={`lessons.${index}.description`}
                            className="block text-sm font-medium text-gray-700"
                          >
                            Lesson Description
                          </label>
                          <Field
                            name={`lessons.${index}.description`}
                            as="textarea"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                          />
                          <ErrorMessage
                            name={`lessons.${index}.description`}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>

                        <VideoUplodeThumbnail
                          name={`lessons.${index}.lessonVideo`}
                          label={`Lesson ${index + 1} Video`}
                          setFieldValue={setFieldValue}
                        />

                        <div className="flex justify-end mt-2">
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500"
                          >
                            Remove Lesson
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            lessonNumber: "",
                            title: "",
                            description: "",
                            lessonVideo: "",
                          })
                        }
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                      >
                        Add Lesson
                      </button>
                    </div>
                  </div>
                )}
              </FieldArray>

             

              <div className="mb-4">
                <label
                  htmlFor="pricing.type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pricing Type
                </label>
                <Field
                  name="pricing.type"
                  as="select"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                >
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </Field>
                <ErrorMessage
                  name="pricing.type"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {values.pricing.type === "paid" && (
                <div className="mb-4">
                  <label
                    htmlFor="pricing.amount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Amount
                  </label>
                  <Field
                    name="pricing.amount"
                    type="number"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  />
                  <ErrorMessage
                    name="pricing.amount"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              )}

              <div className="flex justify-end">
              <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md"
                  disabled={isSubmitting}
                  onClick={() => console.log("Submit button clicked")}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 ml-4 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}

        </Formik>
      </div>
    </div>
  );
};

export default InstractureAddCourses;
