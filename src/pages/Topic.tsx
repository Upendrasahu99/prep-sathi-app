import React from 'react'
import { Outlet } from 'react-router-dom'

const Topic = () => {
  return (
    <div>
      Topic
      <Outlet/>
    </div>
  )
}

export default Topic