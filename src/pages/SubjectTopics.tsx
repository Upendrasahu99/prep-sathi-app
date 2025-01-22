import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { MainContext } from '../contexts/MainContextProvider'

const SubjectTopics = () => {
  const {topics, subject, setTopic} = useContext(MainContext);
  return (
    <ul className="menu menu-md bg-base-200 rounded-box w-full mx-auto">
    {
      topics.map((data)=>
          <li key={data.id}><Link to={`/select-mode/${subject}/${data.topicEnglish}`} onClick={() => setTopic(data.topicEnglish)}>{data.topicEnglish}({data.topicHindi})</Link></li>
      )
    }
  </ul>
  )
}

export default SubjectTopics