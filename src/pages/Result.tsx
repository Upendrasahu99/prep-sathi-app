import React, {useContext} from 'react'
import{MainContext} from '../contexts/MainContextProvider'
import { useNavigate } from 'react-router-dom';
const Result = () => {
  const {submittedData, totalTimeTaken, subject} = useContext(MainContext);

  const navigate = useNavigate();
  if(subject === ''){
    navigate('/subjects');
  }
  let totalWrongAnswers = 0;
  let totalCorrectAnswers = 0;
  let totalUnselectedAnswers = 0;
  submittedData.map((question, qIndex) => {
    const isUnselected = question.selectedOption === undefined;
    const isCorrectAnswer = question.correctAnswer.correctOptionId === question.selectedOption;
    if(isUnselected)totalUnselectedAnswers++;
    if(isCorrectAnswer)totalCorrectAnswers++;
    if(!isCorrectAnswer)totalWrongAnswers++;
  })

  return (
   <div>
    <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-7 p-0 sm:p-7 mb-5'>
    <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title">Total</div>
          <div className="stat-value ">{submittedData.length}</div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title ">Corrrect</div>
          <div className="stat-value">{totalCorrectAnswers}</div>
          <div className="stat-desc badge badge-success">correct</div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title">Wrong</div>
          <div className="stat-value">{totalWrongAnswers}</div>
          <div className="stat-desc badge badge-error">Wrong</div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title">Unselected</div>
          <div className="stat-value">{totalUnselectedAnswers}</div>
          <div className="stat-desc badge badge-warning">Unselected</div>
        </div>
      </div>
      <div className="stats shadow col-span-2 sm:col-span-4">
        <div className="stat place-items-center">
          <div className="stat-title">Time Taken</div>
          <div className="stat-value">{totalTimeTaken}</div>
        </div>
      </div>
    </div>
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 p-0 sm:p-7 mb-5'>
        {
          submittedData.map((question, qIndex) =>{ 
            const isUnselected = question.selectedOption === undefined;
            const isCorrectAnswer = question.correctAnswer.correctOptionId === question.selectedOption;
            // if(isUnselected)totalUnselectedAnswers++;
            // if(isCorrectAnswer)totalCorrectAnswers++;
            // if(!isCorrectAnswer)totalWrongAnswers++;
            return (
              <div key={qIndex} className={`card bg-base-100  w-full shadow-xl border-2 ${isUnselected ? 'border-warning' : isCorrectAnswer ? 'border-success' : 'border-error'}`}>
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
          })
        }
    </div>
   </div>
  )
}

export default Result