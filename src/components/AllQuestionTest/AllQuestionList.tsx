import React from 'react'

import {logicalReasoning} from "../../data/questionData"
const AllQuestionList = () => {
  const questionData = logicalReasoning;

  return (
    <div className='w-full flex flex-col items-center gap-7'>
      {
        questionData.map((question, index) => (
          <div key={index} className="card bg-base-100  w-full  md:w-1/2 shadow-xl">
            <div className="card-body">
              <div>
                <div className="badge badge-neutral">{index+1}.</div> {question.questionHindi}
              </div>
              <div>
                <div className="badge badge-neutral">{index+1}.</div> {question.questionEnglish}
              </div>
              <div className='flex flex-col gap-5 mt-5'>
                {                 
                  question.questionOptionsHindi.map((option, index) => (  
                           
                    <div className="form-control border rounded-lg" key={index}>
                      <label className="label cursor-pointer">
                        <span className="label-text">
                          <div className='flex flex-col'>
                            <label htmlFor={`${question.questionId}${option.id}`} className='cursor-pointer'>{option.text}</label>
                            <label htmlFor={`${question.questionId}${option.id}`} className='cursor-pointer'>{question.questionOptionsEnglish[index].text}</label>
                          </div>
                        </span>
                        <input id={`${question.questionId}${option.id}`} type="radio" name={`${question.questionId}`} className="radio" />
                      </label>
                    </div>

                  )) 
                }
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default AllQuestionList