import React from 'react'
import InstructorSidebar from '../../../components/instrcture/InstructorSidebar'
import InstructoreProfileList from './components/InstructoreProfileList'

const InstractureProfile = () => {
  return (
    <div className="lg:flex">
        <InstructorSidebar />
        <div className="flex-grow p-6 h-screen bg-gray-100 lg:ml-64">
          <h2 className="text-3xl font-semibold mb-6">Instructor  Profile</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
          {/* <p>Welcome to the Instructor  Courses!</p> */}
           <InstructoreProfileList/>
          </div>
        </div>
      </div>
  )
}

export default InstractureProfile
