import React from 'react'
import CountdownTimer from './CountdownTimer'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 bg-base-300 mb-7 flex justify-between">
      <a className="btn btn-ghost text-xl">Quiz</a>
      <CountdownTimer/>
    </div>
  )
}

export default Navbar