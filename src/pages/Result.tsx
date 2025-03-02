import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    submittedData = [],
    totalCorrectAnswers = 0,
    totalWrongAnswers = 0,
    totalUnselectedAnswers = 0,
    totalTime = 0,
    timeTaken = 0,
    timeTakenPerQuestion = [], // New field for per-question stats
  } = location.state || {};

  const handleHomeClick = () => {
    navigate('/subjects');
  };

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const timeLeft = totalTime - timeTaken;
  const avgTimeTaken = timeTakenPerQuestion.length > 0 
    ? timeTakenPerQuestion.reduce((sum, time) => sum + time, 0) / timeTakenPerQuestion.length 
    : 0;
  const maxTimeTaken = timeTakenPerQuestion.length > 0 ? Math.max(...timeTakenPerQuestion) : 0;
  const minTimeTaken = timeTakenPerQuestion.length > 0 ? Math.min(...timeTakenPerQuestion) : 0;

  return (
    <div className="container mx-auto p-4">
      <div className="w-full grid grid-cols-2 sm:grid-cols-4  sm:gap-7 p-0 sm:p-7 mb-5">
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Total</div>
            <div className="stat-value text-gray-900 dark:text-gray-100 text-lg sm:text-5xl">{submittedData.length}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Correct</div>
            <div className="stat-value text-gray-900 dark:text-gray-100 text-lg sm:text-5xl">{totalCorrectAnswers}</div>
            <div className="stat-desc badge badge-success">correct</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Wrong</div>
            <div className="stat-value text-gray-900 dark:text-gray-100 text-lg sm:text-5xl">{totalWrongAnswers}</div>
            <div className="stat-desc badge badge-error">Wrong</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Unselected</div>
            <div className="stat-value text-gray-900 dark:text-gray-100 text-lg sm:text-5xl">{totalUnselectedAnswers}</div>
            <div className="stat-desc badge badge-warning">Unselected</div>
          </div>
        </div>
      </div>

      {totalTime > 0 && (
        <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-7 p-0 sm:p-7 mb-5">
          <div className="stats shadow">
            <div className="stat place-items-center">
              <div className="stat-title">Time Taken</div>
              <div className="stat-value text-gray-900 dark:text-gray-100 text-lg sm:text-5xl">{formatTime(timeTaken)}</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat place-items-center">
              <div className="stat-title">Time Left</div>
              <div className="stat-value text-gray-900 dark:text-gray-100 text-lg sm:text-5xl">{formatTime(timeLeft)}</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat place-items-center">
              <div className="stat-title">Average Time</div>
              <div className="stat-value text-gray-900 dark:text-gray-100 text-lg sm:text-5xl">{formatTime(avgTimeTaken)}</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat place-items-center">
              <div className="stat-title">Max Time</div>
              <div className="stat-value text-gray-900 dark:text-gray-100 text-lg sm:text-5xl">{formatTime(maxTimeTaken)}</div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat place-items-center">
              <div className="stat-title">Min Time</div>
              <div className="stat-value text-gray-900 dark:text-gray-100 text-lg sm:text-5xl">{formatTime(minTimeTaken)}</div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 p-0 sm:p-7 mb-5">
        {submittedData.map((question: any, qIndex: number) => {
          const isUnselected = question.selectedOption === undefined;
          const isCorrectAnswer = question.correctAnswer.correctOptionId === question.selectedOption;

          return (
            <div
              key={qIndex}
              className={`card bg-base-100 w-full shadow-xl border-2 ${
                isUnselected ? 'border-warning' : isCorrectAnswer ? 'border-success' : 'border-error'
              }`}
            >
              <div className="card-body">
                <div>
                  <div className="badge badge-neutral">{qIndex + 1}.</div>{' '}
                  <span className="text-gray-900 dark:text-gray-100">{question.questionHindi}</span>
                </div>
                <div>
                  <div className="badge badge-neutral">{qIndex + 1}.</div>{' '}
                  <span className="text-gray-900 dark:text-gray-100">{question.questionEnglish}</span>
                </div>
                <div className="mt-2">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Time Taken: </span>
                  <span className="text-gray-600 dark:text-gray-400">{formatTime(question.timeTaken)}</span>
                </div>
                <div className="flex flex-col gap-5 mt-5">
                  {question.questionOptionsHindi.map((option: any, index: number) => {
                    const isCorrectOption = option.id === question.correctAnswer.correctOptionId;
                    const isSelected = question.selectedOption === option.id;
                    const wrongSelected = isSelected && !isCorrectAnswer;

                    return (
                      <div
                        className={`form-control border ${
                          isCorrectOption
                            ? 'border-success'
                            : wrongSelected
                            ? 'border-error'
                            : 'border-gray-200 dark:border-gray-700'
                        } rounded-lg pointer-events-none`}
                        key={index}
                      >
                        <label className="label cursor-pointer">
                          <span className="label-text">
                            <div className="flex flex-col">
                              <label className="text-gray-900 dark:text-gray-100">{option.text}</label>
                              <label className="text-gray-600 dark:text-gray-400">
                                {question.questionOptionsEnglish[index].text}
                              </label>
                            </div>
                          </span>
                          <input
                            id={`${question.questionId}${option.id}`}
                            type="radio"
                            value={option.id}
                            className={`radio ${isCorrectOption ? 'radio-success' : wrongSelected ? 'radio-error' : ''}`}
                            checked={isSelected}
                            disabled
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        <button className="btn btn-success" onClick={handleHomeClick}>
          Home
        </button>
      </div>
    </div>
  );
};

export default Result;