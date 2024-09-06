import React from 'react'
import { Audio } from 'react-loader-spinner';


const LodingData = () => {
  return (
    <div>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        wrapperClass=""
      />
    </div>
  )
}

export default LodingData
