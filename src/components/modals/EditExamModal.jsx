import React from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { URL } from "../../common/api";
import { config } from "../../common/configurations";
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

const EditExamModal = ({ isOpen, onClose, onSubmit, instructorId, courseId, exam }) => {
  if (!exam) {
    console.error("EditExamModal requires an 'exam' prop.");
    return null;
  }
  // console.log("EditExamModal data....",exam);
  

  const initialValues = {
    title: exam.title || "",
    questions: exam.questions.length > 0 ? exam.questions.map(q => ({
      question: q.question || "",
      options: q.options.length === 4 ? q.options : ["", "", "", ""],
      answer: q.answer || "",
    })) : [
      {
        question: "",
        options: ["", "", "", ""],
        answer: "",
      },
    ],
    questionScore: exam.questionScore || 0,
    totalScore: exam.totalScore || 0,
    passingScore: exam.passingScore || 0,
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
      const dataToSend = {
        ...values,
        instructorId,
        courseId,
        examId: exam.id, 
      };

      console.log("Edited exam data..",dataToSend);
      // console.log("Edited exam id..",exam._id);
      

      const response = await axios.put(`${URL}/course/update-assessment/${exam._id}`, dataToSend, config);

      console.log("updateAssessment response",response);
      

      if (response.status === 200) {
        toast.success("Assessment updated successfully!");
        onSubmit(response.data.data); 
      } else {
        toast.error("Failed to update the exam.");
      }

    } catch (error) {
      console.error("Edit exam error:", error);
      toast.error("An error occurred while updating the exam.");
    }
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values }) => (
            <Form className="flex flex-col flex-1">
              <div className="sticky top-0 bg-white z-10 p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Edit Exam</h2>
                  <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
                    aria-label="Close modal"
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
                    <div className="mb-4 ">
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
                            <div key={optIndex} className="mb-2">
                              <Field
                                name={`questions[${qIndex}].options[${optIndex}]`}
                                type="text"
                                className="w-full border p-2 rounded"
                                placeholder={`Option ${optIndex + 1}`}
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
                    Save Changes
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

EditExamModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  instructorId: PropTypes.string.isRequired,
  courseId: PropTypes.string.isRequired,
  exam: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.string),
        answer: PropTypes.string,
      })
    ),
    questionScore: PropTypes.number,
    totalScore: PropTypes.number,
    passingScore: PropTypes.number,
  }).isRequired,
};

export default EditExamModal;
