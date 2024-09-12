import React from 'react'
import InstructorSidebar from '../../../components/instrcture/InstructorSidebar'
import InstructoreCourseList from './components/InstructoreCourseList'

const InstractureCourses = () => {
  
  return (
    <div className="lg:flex">
        <InstructorSidebar />
        <div className="flex-grow h-screen p-6 bg-gray-100 lg:ml-64">
          <h2 className="text-3xl font-semibold mb-6">Instructor Courses</h2>
            <InstructoreCourseList/>
        </div>
    </div>
  )
}

export default InstractureCourses
