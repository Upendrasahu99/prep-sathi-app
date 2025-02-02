import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { MainContext } from '../contexts/MainContextProvider'

const SelectMode = () => {
  const {topic, subject} = useContext(MainContext);

  const navigate = useNavigate();
  useEffect(() =>{
    if(subject === ''){
      navigate('/subjects');
    }
  },[])
  
  return (
    <ul className="menu bg-base-200 rounded-box ">
      {/* <li><Link to= {`/test-single-question/${subject}/${topic}`}>Question-by-question</Link></li> */}
      <li className='disabled ps-3'>Question-by-question</li>
      <li><Link to= {`/test-all-questions/${subject}/${topic}`}>Full test</Link></li>
    </ul>
  )
}

export default SelectMode