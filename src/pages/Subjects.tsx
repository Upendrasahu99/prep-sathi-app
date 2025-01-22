import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { MainContext } from '../contexts/MainContextProvider';

const Subjects = () => {
  const {subjects} = useContext(MainContext);

  return (
    <ul className="menu menu-md bg-base-200 rounded-box w-full mx-auto">
      {
        subjects.map((data)=>
            <li key={data.id}><Link to={`/subjects/${data.subject}`}>{data.subject}</Link></li>
        )
      }
    </ul>
  )
}

export default Subjects