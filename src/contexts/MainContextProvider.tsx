import React, { createContext, useEffect, useState } from 'react'
import {subjectArr} from '../data//subjectData'
import { topicArr } from '../data/topicData';

// App write data calll

import {databases} from '../utils/appwrite/config.js'

const getSubjects = async () => {
  const subjects = await databases.listDocuments(
    import.meta.env.VITE_DATABASE_ID,
    import.meta.env.VITE_COLLECTION_ID_SUBJECT
  )
  console.log(subjects.documents);
  return subjects.documents;
}



const MainContext = createContext();

const MainContextProvider = ({children}) => {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState('');
  const [subjectId, setSubjectId] = useState(0);
  const [topic, setTopic] = useState('');
  const topics = topicArr.filter((data) => data.subjectId === subjectId);
  const [submittedData, setSubmittedData] = useState([]);
  const [inputTime, setInputTime] = useState('00:00:00');
  const [startTest, setStartTest] = useState(false);
  const [totalTimeTaken, setTotalTimeTaken] = useState('');
  const [startTime, setStartTime] = useState(null);
  useEffect(() => {
    getSubjects().then((data) => {
      setSubjects(data);
    })
  }, [])

  const value = { 
    subjects,
    topics,

    setSubjectId,
    subject,
    setSubject, 
    topic,
    setTopic,
    submittedData,
    setSubmittedData,
    inputTime,
    setInputTime,
    startTest,
    setStartTest,
    totalTimeTaken,
    setTotalTimeTaken,
    startTime,
    setStartTime
  }

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  )
}

export {MainContextProvider as default, MainContext}