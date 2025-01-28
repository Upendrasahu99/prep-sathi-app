import React, { useContext } from 'react'
import {logicalReasoning} from "../../data/questionData"
import { MainContext } from '../../contexts/MainContextProvider';
import { useNavigate } from 'react-router-dom';

const AllQuestionList = () => {
  const {setSubmittedData, topic, subject} = useContext(MainContext);
  const questionData = logicalReasoning;
  const navigate = useNavigate();

  const onOptionClick = (e, index) => {
    questionData[index].selectedOption = e.target.value;
  } 

  const onSubmitTest = () => {
    setSubmittedData(questionData);

    navigate(`/result/${subject}/${topic}`);
    // console.log(questionData);
  }
  return (
    <div className='w-full flex flex-col items-center gap-7 mb-5'>
      {
        questionData.map((question, qIndex) => (
          <div key={qIndex} className="card bg-base-100  w-full  md:w-1/2 shadow-xl">
            <div className="card-body">
              <div>
                <div className="badge badge-neutral">{qIndex+1}.</div> {question.questionHindi}
              </div>
              <div>
                <div className="badge badge-neutral">{qIndex+1}.</div> {question.questionEnglish}
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
                        <input 
                        id={`${question.questionId}${option.id}`} 
                        type="radio" 
                        name={`${question.questionId}`} 
                        value={option.id}
                        className="radio" onChange={(e) => {onOptionClick(e, qIndex)}} />
                      </label>
                    </div>

                  )) 
                }
              </div>
            </div>
          </div>
        ))
      }
      <input type="submit" value="Submit" className="btn btn-wide btn-outline" onClick={() => {onSubmitTest()}}/>
    </div>
  )
}

export default AllQuestionList