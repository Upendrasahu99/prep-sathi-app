import React from 'react'
import { Outlet } from 'react-router-dom'

const SelectTestMode = () => {
  return (
    <div>SelectTestMode
      <Outlet/>
    </div>
  )
}

export default SelectTestMode