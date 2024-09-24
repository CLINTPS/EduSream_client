import React from 'react'
import UserSideBar from '../../components/user/UserSidebar'
import CourseList from '../../components/user/profile/CourseList'

const UserEnrolledCourses = () => {
  return (
    <div className="lg:flex">
    <UserSideBar />
    <div className="flex-grow p-6 h-screen bg-gray-300 lg:ml-64">
      <h2 className="text-3xl font-bold mb-6">User Enrolled Course</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <CourseList />
      </div>
    </div>
  </div>
  )
}

export default UserEnrolledCourses
