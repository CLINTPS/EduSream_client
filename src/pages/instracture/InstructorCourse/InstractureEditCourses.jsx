import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import InstructorSidebar from "../../../components/instrcture/InstructorSidebar";
import ImageUpload from "./components/ImageUpload";
import VideoUplodeThumbnail from "./components/VideoUplodeThumbnail";
import { EditCourse } from "../../../redux/actions/courseAction";  
import toast from "react-hot-toast";

const courseSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  thumbnailImage: Yup.string(),
  thumbnailVideo: Yup.string(),
  language: Yup.string(),
  lessons: Yup.array().of(
    Yup.object().shape({
      lessonNumber: Yup.string().required("Lesson number is required"),
      title: Yup.string().required("Lesson title is required"),
      description: Yup.string().required("Lesson description is required"),
      lessonVideo: Yup.string().required("Lesson video URL is required"),
    })
  ),
  pricing: Yup.object().shape({
    type: Yup.string().oneOf(["free", "paid"]).default("free"),
    amount: Yup.number().when("type", {
      is: "paid",
      then: Yup.number().required("Amount is required"),
    }),
  }),
});

const InstructorEditCourses = () => {
  const location = useLocation();
  const { course } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!course) {
      navigate("/instructor/courses");
    }
  }, [course, navigate]);

  const handleSubmit = async (values, setSubmitting) => {
    try {
      const courseData = { ...values, courseId: course._id }; 
      console.log("courseData............",courseData);
      
      const response = await dispatch(EditCourse(courseData));
      console.log("...............",response);
      
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Course updated successfully.");
        navigate("/instructor/courses");
      } else {
        toast.error("Failed to update course.");
        console.error("Failed to update course:", response.payload);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/instructor/courses");
  };

  return (
    <div className="lg:flex">
      <InstructorSidebar />
      <div className="flex-grow p-6 bg-gray-100 lg:ml-64">
        <h2 className="text-3xl font-semibold mb-6">Edit Course</h2>
        <Formik
          initialValues={{
            title: course.title || "",
            description: course.description || "",
            thumbnailImage: course.thumbnailImage || "",
            thumbnailVideo: course.thumbnailVideo || "",
            language: course.language || "english",
            lessons: course.lessons || [{
              lessonNumber: "",
              title: "",
              description: "",
              lessonVideo: "",
            }],
            pricing: course.pricing || { type: "free", amount: 0 },
          }}
          validationSchema={courseSchema}
          onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
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
                existingImageUrl={course.thumbnailImage}
              />
              <VideoUplodeThumbnail
                name="thumbnailVideo"
                label="Course Thumbnail Video"
                setFieldValue={setFieldValue}
                existingVideoUrl={course.thumbnailVideo}
              />

              <div className="mb-4">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700"
                >
                  Language
                </label>
                <Field
                  name="language"
                  as="select"
                  className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm"
                >
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
                        <h4 className="font-medium text-lg">Lesson {index + 1}</h4>
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
                          existingVideoUrl={lesson.lessonVideo}
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
                  className="mt-1 block p-2 w-full border-gray-300 rounded-md shadow-sm"
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
                    Pricing Amount
                  </label>
                  <Field
                    name="pricing.amount"
                    type="number"
                    className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
                  />
                  <ErrorMessage
                    name="pricing.amount"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              )}

              <div className="flex justify-end mt-6 space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {isSubmitting ? "Updating..." : "Update Course"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InstructorEditCourses;
