import React,{useContext} from 'react'
import CountdownTimer from './CountdownTimer'
import { MainContext } from '../../contexts/MainContextProvider'

const Navbar = () => {
  const {startTest} = useContext(MainContext);
  return (
    <div className="navbar bg-base-100 bg-base-300 mb-7 flex justify-between">
      <a className="btn btn-ghost text-xl">Quiz</a>
      {startTest && <CountdownTimer/>}
    </div>
  )
}

export default Navbar