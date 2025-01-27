import React, { useState } from 'react'
import TestSetting from '../components/testSetting/TestSetting'

import AllQuestionList from '../components/AllQuestionTest/AllQuestionList';
import SubmitButton from '../components/AllQuestionTest/SubmitButton';

const AllQuestionTest = () => {
  const [startTest, setStartTest] = useState(false);

  const handleStartTest = () => {
    setStartTest(true)
  }
  return (
    <div>
      {
        startTest 
        ?

        <AllQuestionList/>
        
        :
        <TestSetting handleStartTest={handleStartTest}/>
      }
    </div>
  )
}

export default AllQuestionTest