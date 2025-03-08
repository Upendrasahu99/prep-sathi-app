import React, { useState } from 'react';
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
    timeTakenPerQuestion = [],
    testFormat,
  } = location.state || {};

  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null); // State for modal


  const handleHomeClick = () => {
    navigate('/');
  };

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const timeLeft = totalTime - timeTaken;
  const avgTimeTaken =
    timeTakenPerQuestion.length > 0
      ? timeTakenPerQuestion.reduce((sum, time) => sum + time, 0) / timeTakenPerQuestion.length
      : 0;
  const maxTimeTaken = timeTakenPerQuestion.length > 0 ? Math.max(...timeTakenPerQuestion) : 0;
  const minTimeTaken = timeTakenPerQuestion.length > 0 ? Math.min(...timeTakenPerQuestion) : 0;

  const openModal = (question: any) => {
    setSelectedQuestion(question);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 sm:gap-7 p-0 sm:p-7 mb-5">
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
          <div className={`stats shadow ${testFormat === 'full' && 'hidden'}`}>
            <div className="stat place-items-center">
              <div className="stat-title">Average Time</div>
              <div className="stat-value text-gray-900 dark:text-gray-100 text-lg sm:text-5xl">{formatTime(avgTimeTaken)}</div>
            </div>
          </div>
          <div className={`stats shadow ${testFormat === 'full' && 'hidden'}`}>
            <div className="stat place-items-center">
              <div className="stat-title">Max Time</div>
              <div className="stat-value text-gray-900 dark:text-gray-100 text-lg sm:text-5xl">{formatTime(maxTimeTaken)}</div>
            </div>
          </div>
          <div className={`stats shadow ${testFormat === 'full' && 'hidden'}`}>
            <div className="stat place-items-center">
              <div className="stat-title">Min Time</div>
              <div className="stat-value text-gray-900 dark:text-gray-100 text-lg sm:text-5xl">{formatTime(minTimeTaken)}</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center my-6">
        <button className="btn btn-success" onClick={handleHomeClick}>
          Home
        </button>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 p-0 sm:p-7 mb-5">
        {submittedData.map((question: any, qIndex: number) => {
          const isUnselected = question.selectedOption === undefined;
          const isCorrectAnswer = question.correctAnswer.correctOptionId === question.selectedOption;

          return (
            <div
              key={qIndex}
              className={`card bg-base-100 w-full shadow-xl border-2 cursor-pointer ${
                isUnselected ? 'border-warning' : isCorrectAnswer ? 'border-success' : 'border-error'
              }`}
              onClick={() => question.explanations !== undefined && openModal(question)}
            >
              <div className="card-body">
                <div className={`mt-2 p-2 bg-base-200 rounded-lg shadow-sm flex items-center gap-2 ${testFormat === 'full' && 'hidden'}`}>
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="badge badge-neutral rounded-lg text-lg">
                    <span className="font-semibold text-gray-900 dark:text-gray-100">Time Taken: </span>
                    <span className="ms-1 font-extrabold">{formatTime(question.timeTaken)}</span>
                  </div>
                </div>
                <div>
                  <div className="badge badge-neutral">{qIndex + 1}.</div>{' '}
                  <span className="text-gray-900 dark:text-gray-100">{question.questionEnglish}</span>
                </div>
                <div>
                  <span className="text-gray-900 dark:text-gray-100">{question.questionHindi}</span>
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
                              <label className="text-gray-600 dark:text-gray-400">
                                {question.questionOptionsEnglish[index].text}
                              </label>
                              <label className="text-gray-900 dark:text-gray-100">{option.text}</label>
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

      {/* Full-Screen Modal */}
      {selectedQuestion && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-5xl h-5/6 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Question {submittedData.findIndex((q) => q.questionId === selectedQuestion.questionId) + 1}
            </h2>
            <div className="mb-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">{selectedQuestion.questionEnglish}</p>
              <p className="text-gray-600 dark:text-gray-400">{selectedQuestion.questionHindi}</p>
            </div>
            {testFormat !== 'full' && (
              <div className="mb-4 p-2 bg-base-200 rounded-lg shadow-sm flex items-center gap-2">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="badge badge-neutral rounded-lg text-lg">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">Time Taken: </span>
                  <span className="ms-1 font-extrabold">{formatTime(selectedQuestion.timeTaken)}</span>
                </div>
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Explanations</h3>
            <div className="space-y-4">
              {selectedQuestion.explanations?.map((exp: any, index: number) => (
                <div key={index} className="p-4 bg-base-100 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-primary">{exp.key}</span>
                    {exp.key === selectedQuestion.correctAnswer.correctOptionId && (
                      <span className="badge badge-success">Correct Answer</span>
                    )}
                    {exp.key === selectedQuestion.selectedOption && exp.key !== selectedQuestion.correctAnswer.correctOptionId && (
                      <span className="badge badge-error">Your Answer</span>
                    )}
                  </div>
                  <p className="text-gray-900 dark:text-gray-100 font-medium">{exp.explanationEnglish}</p>
                  <p className="text-gray-600 dark:text-gray-400 mt-2">{exp.explanationHindi}</p>
                </div>
              ))}
            </div>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;