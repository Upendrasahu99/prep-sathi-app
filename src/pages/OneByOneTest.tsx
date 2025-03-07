import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OneByOneTest: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, testType, questionTimer } = location.state || { questions: [], testType: 'oneByOne', questionTimer: 0 };
  const [userAnswers, setUserAnswers] = useState(() => JSON.parse(localStorage.getItem('testAnswers')) || {});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(questionTimer);
  const [timeTakenPerQuestion, setTimeTakenPerQuestion] = useState<number[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    localStorage.setItem('testAnswers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    if (isInitialLoad) {
      const checkInitialState = () => {
        if (!questions.length || testType !== 'oneByOne' || questionTimer <= 0) {
          localStorage.removeItem('testAnswers');
          navigate('/subjects', { replace: true });
        } else {
          setIsInitialLoad(false);
        }
      };
      setTimeout(checkInitialState, 0);
    }
  }, [questions, testType, questionTimer, navigate, isInitialLoad]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? Your test progress will be lost.';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    const handlePopState = () => {
      if (window.confirm('Are you sure you want to leave? Your test progress will be lost.')) {
        localStorage.removeItem('testAnswers');
        navigate('/subjects', { replace: true });
      } else {
        window.history.pushState(null, window.location.pathname);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  useEffect(() => {
    if (questionTimer > 0 && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleNextQuestion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentQuestionIndex, questionTimer]);

  const handleAnswerSelect = (questionId: string, optionKey: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const handleNextQuestion = () => {
    const isUnselected = userAnswers[questions[currentQuestionIndex]._id] === undefined;
    const timeTaken = remainingTime === 0 && isUnselected 
      ? questionTimer // Full time if timer runs out and no selection
      : questionTimer - remainingTime; // Actual time if "Next" clicked
    setTimeTakenPerQuestion((prev) => [...prev, timeTaken]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setRemainingTime(questionTimer);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    let totalWrongAnswers = 0;
    let totalCorrectAnswers = 0;
    let totalUnselectedAnswers = 0;

    const isUnselected = userAnswers[questions[currentQuestionIndex]._id] === undefined;
    const currentTimeTaken = remainingTime === 0 && isUnselected 
      ? questionTimer 
      : questionTimer - remainingTime;
    const allTimeTaken = currentQuestionIndex === questions.length - 1
      ? [...timeTakenPerQuestion, currentTimeTaken]
      : timeTakenPerQuestion;

    const submittedData = questions.map((q: any, index: number) => {
      const isUnselected = userAnswers[q._id] === undefined;
      const isCorrectAnswer = q.correctOption === userAnswers[q._id];

      if (isUnselected) totalUnselectedAnswers++;
      else if (isCorrectAnswer) totalCorrectAnswers++;
      else totalWrongAnswers++;

      return {
        questionId: q._id,
        questionEnglish: q.questionEnglish,
        questionHindi: q.questionHindi,
        questionOptionsEnglish: q.optionsEnglish.map((opt: any) => ({
          id: opt.key,
          text: opt.value,
        })),
        questionOptionsHindi: q.optionsHindi.map((opt: any) => ({
          id: opt.key,
          text: opt.value,
        })),
        selectedOption: userAnswers[q._id],
        correctAnswer: { correctOptionId: q.correctOption },
        timeTaken: allTimeTaken[index] || 0,
        explanations: q.explanations
      };
    });

    const resultData = {
      submittedData,
      totalCorrectAnswers,
      totalWrongAnswers,
      totalUnselectedAnswers,
      totalTime: questionTimer * questions.length,
      timeTaken: allTimeTaken.reduce((sum: number, time: number) => sum + time, 0),
      timeTakenPerQuestion: allTimeTaken, // Pass array for stats
    };

    localStorage.removeItem('testAnswers');
    navigate('/result', { state: resultData });
  };

  const getTimeComponents = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return { hrs, mins, secs };
  };

  const { hrs, mins, secs } = getTimeComponents(remainingTime);

  if (!questions.length || isInitialLoad) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto p-4 relative">
      {questionTimer > 0 && (
        <div className="fixed top-0 left-0 right-0 bg-base-200 p-2 shadow-md z-50 text-center">
          <span className="countdown font-mono text-2xl text-gray-900 dark:text-gray-100">
            <span style={{ '--value': hrs } as React.CSSProperties}></span>:
            <span style={{ '--value': mins } as React.CSSProperties}></span>:
            <span style={{ '--value': secs } as React.CSSProperties}></span>
          </span>
        </div>
      )}

      <div className={questionTimer > 0 ? 'mt-12' : ''}>
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h1>

        <div className="card bg-base-100 shadow-xl mb-6 border border-gray-200 dark:border-gray-700">
          <div className="card-body">
            <h2 className="card-title text-gray-900 dark:text-gray-100">Question {currentQuestionIndex + 1}</h2>
            <div className="mb-4">
              <p className="font-semibold text-gray-900 dark:text-gray-100">{currentQuestion.questionEnglish}</p>
              <p className="text-gray-600 dark:text-gray-400">{currentQuestion.questionHindi}</p>
            </div>
            <div className="form-control">
              {currentQuestion.optionsEnglish.map((option: any, idx: number) => (
                <label
                  key={option._id}
                  className="label cursor-pointer justify-start gap-2 py-3 border-b last:border-b-0 border-gray-200 dark:border-gray-700"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion._id}`}
                    className="radio radio-primary"
                    checked={userAnswers[currentQuestion._id] === option.key}
                    onChange={() => handleAnswerSelect(currentQuestion._id, option.key)}
                  />
                  <div className="flex-1">
                    <span className="label-text font-semibold text-gray-900 dark:text-gray-100">{option.key}. {option.value}</span>
                    <span className="label-text text-gray-600 dark:text-gray-400 block">{currentQuestion.optionsHindi[idx].value}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleNextQuestion}>
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Test'}
        </button>
      </div>
    </div>
  );
};

export default OneByOneTest;