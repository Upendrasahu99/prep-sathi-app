import React, { createContext, useEffect, useState } from 'react'
import {subjectArr} from '../data//subjectData'
import { topicArr } from '../data/topicData';

const MainContext = createContext();

const MainContextProvider = ({children}) => {
  
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [topic, setTopic] = useState('');
  const topics = topicArr.filter((data) => data.subjectId === subjectId);
  const [submittedData, setSubmittedData] = useState([]);
  const [inputTime, setInputTime] = useState('00:00:00');
  const [startTest, setStartTest] = useState(false);
  const [totalTimeTaken, setTotalTimeTaken] = useState('');
  const [startTime, setStartTime] = useState(null);
  
  console.log(topic);

  if(topic !== ''){
    // const getQuestions =  async()=>{
    //   const response = await fetch(`http://localhost:5500/api/v1/questions/topic/${topic}?size=5`);
    //   const data = await response.json();
    //   console.log(data.data);
    // }
    // getQuestions();
  }
  
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