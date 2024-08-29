import React, { Suspense } from 'react'
import Sidebar from '../../components/admin/Sidebar'
import WelcomeAnimation from '../../components/WelcomeAnimation'

const AdminDash = () => {
  return (
    <div>
      <Sidebar/>
      <WelcomeAnimation/>
    </div>
  )
}

export default AdminDash
