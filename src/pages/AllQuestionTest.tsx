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
        <div className='flex flex-col items-center gap-5 mb-5'>
          <AllQuestionList/>
          <SubmitButton/>
        </div>
        
        :
        <TestSetting handleStartTest={handleStartTest}/>
      }
    </div>
  )
}

export default AllQuestionTest