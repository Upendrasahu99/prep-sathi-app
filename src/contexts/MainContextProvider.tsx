import React, { createContext, useState } from 'react'
import {subjectArr} from '../data//subjectData'
import { topicArr } from '../data/topicData';

const MainContext = createContext();

const MainContextProvider = ({children}) => {
  const [subjects, setSubjects] = useState(subjectArr);
  const [subject, setSubject] = useState('');
  const [subjectId, setSubjectId] = useState(0);
  const [topic, setTopic] = useState('');
  const topics = topicArr.filter((data) => data.subjectId === subjectId);
  const [submittedData, setSubmittedData] = useState([]);

  const value = { 
    subjects,
    topics,
    setSubjectId,
    subject,
    setSubject, 
    topic,
    setTopic,
    submittedData,
    setSubmittedData
  }

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  )
}

export {MainContextProvider as default, MainContext}