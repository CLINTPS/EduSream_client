import React from 'react'
import UserSideBar from '../../components/user/UserSidebar'
import SuggestedCourseList from '../../components/user/SuggestedCourseList'

const UserSuggestionCourse = () => {
  return (
    <div className="lg:flex">
    <UserSideBar />
    <div className="flex-grow p-6 h-screen bg-gray-300 lg:ml-64">
      <h2 className="text-3xl font-bold mb-6">Suggested Course</h2>
      <div className="bg-white p-6 rounded-lg shadow-md"> 
        <SuggestedCourseList/>
      </div>
    </div>
  </div>
  )
}

export default UserSuggestionCourse
