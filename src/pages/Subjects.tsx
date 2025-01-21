import React from 'react'
import { Link } from 'react-router-dom';

const Subjects = () => {
  const subjects = [
    "mathematics",
    "reasoning",
    "history",
    "geography",
    "science",
    "hindi",
    "english",
    "economy",
    "currentaffairs",
    "computers"
  ];
  
  return (
    <ul className="menu menu-md bg-base-200 rounded-box w-56 mx-auto">
      {
        subjects.map((subject, index)=>
            <li key={index}><Link to={`/subjects/${subject}`}>{subject}</Link></li>
        )
      }
    </ul>
  )
}

export default Subjects