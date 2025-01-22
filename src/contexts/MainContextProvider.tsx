import React, { createContext, useState } from 'react'
import {subjectArr} from '../data//subjectData'

const MainContext = createContext();

const MainContextProvider = ({children}) => {
  const [subjects, setSubjects] = useState(subjectArr);
  const value = {
    subjects
  }
  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  )
}

export {MainContextProvider as default, MainContext}