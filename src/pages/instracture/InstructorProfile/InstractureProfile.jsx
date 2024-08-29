import React from 'react'
import InstructorSidebar from '../../../components/instrcture/InstructorSidebar'

const InstractureProfile = () => {
  return (
    <div className="lg:flex">
        <InstructorSidebar />
        <div className="flex-grow p-6 bg-gray-100">
          <h2 className="text-3xl font-semibold mb-6">Instructor  Profile</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
           
            <p>Welcome to the Instructor  Profile!</p>
          </div>
        </div>
      </div>
  )
}

export default InstractureProfile
