import React from 'react';
import { Field, ErrorMessage, FieldArray } from "formik";

const LessonsForm = ({ name = "lesson", values }) => (
  <FieldArray name={name}>
    {({ insert, remove, push }) => (
      <div>
        <h3 className="text-xl font-semibold mb-4">Lessons</h3>
        {values[name] && values[name].length > 0 ? (
          values[name].map((lesson, index) => (
            <div key={index} className="border p-4 mb-4 rounded-md">
              <h4 className="font-medium text-lg">Lesson {index + 1}</h4>

              <div className="mb-4">
                <label
                  htmlFor={`${name}.${index}.lessonNumber`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Lesson Number
                </label>
                <Field
                  name={`${name}.${index}.lessonNumber`}
                  type="text"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                />
                <ErrorMessage
                  name={`${name}.${index}.lessonNumber`}
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor={`${name}.${index}.title`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Lesson Title
                </label>
                <Field
                  name={`${name}.${index}.title`}
                  type="text"
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                />
                <ErrorMessage
                  name={`${name}.${index}.title`}
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor={`${name}.${index}.description`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Lesson Description
                </label>
                <Field
                  name={`${name}.${index}.description`}
                  as="textarea"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
                <ErrorMessage
                  name={`${name}.${index}.description`}
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor={`${name}.${index}.video`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Lesson Video URL
                </label>
                <Field
                  name={`${name}.${index}.video`}
                  type="text"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
                <ErrorMessage
                  name={`${name}.${index}.video`}
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500"
                >
                  Remove Lesson
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No lessons added yet.</p>
        )}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              push({
                lessonNumber: "",
                title: "",
                description: "",
                video: "",
                duration: "",
                objectives: [],
              })
            }
            className="bg-gray-500 text-white px-2 py-2 rounded-md"
          >
            Add Lesson
          </button>
        </div>
      </div>
    )}
  </FieldArray>
);

export default LessonsForm;
