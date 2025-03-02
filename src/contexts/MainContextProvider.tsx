import React, { createContext, useEffect, useState } from 'react'
import {subjectArr} from '../data//subjectData'
import { topicArr } from '../data/topicData';

const MainContext = createContext();

const MainContextProvider = ({children}) => {
  
  const value = { }

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  )
}

export {MainContextProvider as default, MainContext}