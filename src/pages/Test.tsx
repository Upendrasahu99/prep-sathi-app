// Test.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Test = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions } = location.state || { questions: [] };
  const [userAnswers, setUserAnswers] = useState({});

  const handleAnswerSelect = (questionId, optionKey) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleSubmit = () => {
    let totalWrongAnswers = 0;
    let totalCorrectAnswers = 0;
    let totalUnselectedAnswers = 0;

    const submittedData = questions.map(q => {
      const isUnselected = userAnswers[q._id] === undefined;
      const isCorrectAnswer = q.correctOption === userAnswers[q._id];
      
      if (isUnselected) totalUnselectedAnswers++;
      else if (isCorrectAnswer) totalCorrectAnswers++;
      else totalWrongAnswers++;

      return {
        questionId: q._id,
        questionEnglish: q.questionEnglish,
        questionHindi: q.questionHindi,
        questionOptionsEnglish: q.optionsEnglish.map(opt => ({
          id: opt.key,
          text: opt.value
        })),
        questionOptionsHindi: q.optionsHindi.map(opt => ({
          id: opt.key,
          text: opt.value
        })),
        selectedOption: userAnswers[q._id],
        correctAnswer: { correctOptionId: q.correctOption }
      };
    });

    const resultData = {
      submittedData,
      totalCorrectAnswers,
      totalWrongAnswers,
      totalUnselectedAnswers,
    };

    navigate('/result', { state: resultData });
  };

  if (!questions.length) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">No questions available</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Test</h1>

      {questions.map((question, index) => (
        <div key={question._id} className="card bg-base-100 shadow-xl mb-6 border border-gray-200 dark:border-gray-700">
          <div className="card-body">
            <h2 className="card-title text-gray-900 dark:text-gray-100">Question {index + 1}</h2>
            <div className="mb-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">{question.questionEnglish}</p>
              <p className="text-gray-600 dark:text-gray-400">{question.questionHindi}</p>
            </div>
            <div className="form-control">
              {question.optionsEnglish.map((option, idx) => (
                <label key={option._id} className="label cursor-pointer justify-start gap-2 py-3 border-b last:border-b-0 border-gray-200 dark:border-gray-700">
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    className="radio radio-primary"
                    checked={userAnswers[question._id] === option.key}
                    onChange={() => handleAnswerSelect(question._id, option.key)}
                  />
                  <div className="flex-1">
                    <span className="label-text font-semibold text-gray-900 dark:text-gray-100">{option.key}. {option.value}</span>
                    <span className="label-text text-gray-600 dark:text-gray-400 block">{question.optionsHindi[idx].value}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button className="btn btn-primary" onClick={handleSubmit}>
        Submit Test
      </button>
    </div>
  );
};

export default Test;