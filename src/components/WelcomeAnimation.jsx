import React from 'react'
import '../App.css'
import { useSelector } from 'react-redux'

const WelcomeAnimation = () => {
  const {user} =  useSelector((state)=>state.user)
  return (
    <div className="welcome-container ml-28">
      <div className="welcome-message">Welcome to {user.firstName}</div>
    </div>
  )
}

export default WelcomeAnimation
