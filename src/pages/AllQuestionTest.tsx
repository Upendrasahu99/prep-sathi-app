import React, { useState, useContext } from 'react'
import TestSetting from '../components/testSetting/TestSetting'

import AllQuestionList from '../components/AllQuestionTest/AllQuestionList';
import { MainContext } from '../contexts/MainContextProvider';

const AllQuestionTest = () => {
  const {startTest} = useContext(MainContext);
  return (
    <div>
      {
        startTest 
        ?
        <AllQuestionList/>
        :
        <TestSetting />
      }
    </div>
  )
}

export default AllQuestionTest