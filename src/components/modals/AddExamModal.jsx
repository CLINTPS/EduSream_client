import React from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "../../common/api";
import { config } from "../../common/configurations";
import toast from 'react-hot-toast'

const AddExamModal = ({ isOpen, onClose, onSubmit, instructorId, courseId }) => {
  const initialValues = {
    title: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ],
    questionScore: 0,
    totalScore: 0,
    passingScore: 0,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Exam title is required"),
    questions: Yup.array()
      .of(
        Yup.object().shape({
          question: Yup.string().required("Question is required"),
          options: Yup.array()
            .of(Yup.string().required("Option is required"))
            .min(4, "You need to provide 4 options")
            .max(4, "You cannot add more than 4 options"),
          answer: Yup.string().required("Correct answer is required"),
        })
      )
      .required("At least one question is required"),
    questionScore: Yup.number()
      .required("Question score is required")
      .min(1, "Minimum score is 1"),
    totalScore: Yup.number()
      .required("Total score is required")
      .min(1, "Total score should be at least 1"),
    passingScore: Yup.number()
      .required("Passing score is required")
      .lessThan(Yup.ref('totalScore'), "Passing score must be less than total score")
      .min(1, "Passing score should be at least 1"),
  });

  const handleSubmit = async (values) => {
    try {
      // console.log("Curent user id...",userId);
      // console.log("Curent course id...",courseId);
      // console.log("Assessment question and answer...",values);
      
      const dataToSend = {
        ...values,
        instructorId,
        courseId
      }
      // console.log("Assessment question and answer...",dataToSend);
      const response = await axios.post(`${URL}/course/create-assessment`,dataToSend,config)
      console.log("Assesment response..",response);
      if(response.status === 200){
        toast.success("Assessment creation successfuly..")
        onSubmit(values);
      }else{
        toast.error("Assessment creation faild..")
      }
      
    } catch (error) {
      console.error("Add exam time error :-", error);
    }
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <div className="sticky top-0 bg-white z-10 p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Add New Exam</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    &times;
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Title</label>
                  <Field
                    name="title"
                    type="text"
                    className="w-full border p-2 rounded"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <FieldArray name="questions">
                  {({ push, remove }) => (
                    <div className="mb-4">
                      {values.questions.map((_, qIndex) => (
                        <div key={qIndex} className="mb-6 border-b pb-4">
                          <label className="block text-gray-700 mb-2">
                            Question {qIndex + 1}
                          </label>
                          <Field
                            name={`questions[${qIndex}].question`}
                            type="text"
                            className="w-full border p-2 rounded mb-2"
                          />
                          <ErrorMessage
                            name={`questions[${qIndex}].question`}
                            component="div"
                            className="text-red-500 text-sm"
                          />

                          <label className="block text-gray-700 mb-2">
                            Options
                          </label>
                          {values.questions[qIndex].options.map((_, optIndex) => (
                            <div key={optIndex}>
                              <Field
                                name={`questions[${qIndex}].options[${optIndex}]`}
                                type="text"
                                className="w-full border p-2 rounded mb-2"
                              />
                              <ErrorMessage
                                name={`questions[${qIndex}].options[${optIndex}]`}
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          ))}

                          <label className="block text-gray-700 mb-2">
                            Correct Answer
                          </label>
                          <Field
                            name={`questions[${qIndex}].answer`}
                            type="text"
                            className="w-full border p-2 rounded"
                          />
                          <ErrorMessage
                            name={`questions[${qIndex}].answer`}
                            component="div"
                            className="text-red-500 text-sm"
                          />

                          {values.questions.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(qIndex)}
                              className="bg-red-500 text-white py-1 px-4 rounded mt-2"
                            >
                              Remove Question
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() =>
                          push({
                            question: "",
                            options: ["", "", "", ""],
                            answer: "",
                          })
                        }
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4 w-full"
                      >
                        Add Another Question
                      </button>
                    </div>
                  )}
                </FieldArray>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Question Score
                    </label>
                    <Field
                      name="questionScore"
                      type="number"
                      className="w-full border p-2 rounded"
                    />
                    <ErrorMessage
                      name="questionScore"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Total Score</label>
                    <Field
                      name="totalScore"
                      type="number"
                      className="w-full border p-2 rounded"
                    />
                    <ErrorMessage
                      name="totalScore"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Passing Score
                    </label>
                    <Field
                      name="passingScore"
                      type="number"
                      className="w-full border p-2 rounded"
                    />
                    <ErrorMessage
                      name="passingScore"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white z-10 p-6 border-t">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  >
                    Save Exam
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  ) : null;
};

export default AddExamModal;
