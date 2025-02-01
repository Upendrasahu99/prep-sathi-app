import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import { MainContext } from '../contexts/MainContextProvider';
import CountdownTimer from '../components/shared/CountdownTimer';

const Subjects = () => {
  const {subjects, setSubjectId, setSubject} = useContext(MainContext);

  return (
    <ul className="menu menu-md bg-base-200 rounded-box w-full mx-auto">
      {
        subjects.map((data)=>
            <li key={data.id}><Link to={`/subjects/${data.subject}`} onClick={() =>{setSubjectId(data.id); setSubject(data.subject) }}>{data.subject}</Link></li>
        )
      }

      <CountdownTimer/>
    </ul>
  )
}

export default Subjects