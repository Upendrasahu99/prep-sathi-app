import React, {useContext} from 'react'
import{MainContext} from '../contexts/MainContextProvider'

const Result = () => {
  const {submittedData} = useContext(MainContext);
  console.log(submittedData);
  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 p-0 sm:p-7 mb-5'>
      {
        submittedData.map((question, qIndex) =>{ 
          const isCorrectAnswer = question.correctAnswer.correctOptionId === question.selectedOption;
          
          return (
            <div key={qIndex} className={`card bg-base-100  w-full shadow-xl border-2 ${isCorrectAnswer ? 'border-success' : 'border-error'}`}>
              <div className="card-body">
                <div>
                  <div className="badge badge-neutral">{qIndex+1}.</div> {question.questionHindi}
                </div>
                <div>
                  <div className="badge badge-neutral">{qIndex+1}.</div> {question.questionEnglish}
                </div>
                <div className='flex flex-col gap-5 mt-5'>
                  {                 
                    question.questionOptionsHindi.map((option, index) =>{ 
                      const isCorrectOption = option.id === question.correctAnswer.correctOptionId;
                      const isSelected = question.selectedOption === option.id;
                      const wrongSelected = isSelected && !isCorrectAnswer;
                      return(         
                        <div className={`form-control border ${isCorrectOption && 'border-success'} ${wrongSelected && 'border-error'} rounded-lg pointer-events-none`} key={index}>
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
                            // name={`${question.questionId}`} 
                            value={option.id}
                            className={`radio ${isCorrectOption && 'radio-success'} ${ wrongSelected && 'radio-error'} `}
                            defaultChecked = {isSelected || isCorrectOption}
                            // disabled
                            />
                          </label>
                        </div>
                      )
                    }) 
                  }
                </div>
              </div>
            </div>
          )
        } 
      )
      }
    </div>
  )
}

export default Result