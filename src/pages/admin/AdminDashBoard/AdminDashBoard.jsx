import React from 'react'
import Sidebar from '../../../components/admin/Sidebar'

const AdminDashBoard = () => {
  return (
    <div className="lg:flex">
      <Sidebar />
      <div className="flex-grow p-6 h-screen bg-gray-100 lg:ml-64">
        <h2 className="text-3xl font-semibold mb-6">Admin Dashboard</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
         
          <p>Welcome to the admin dashboard!</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashBoard
