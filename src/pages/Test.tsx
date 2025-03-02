import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Test = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, timer, testFormat} = location.state || { questions: [], timer: 0 };
  const [userAnswers, setUserAnswers] = useState(() => {
    return JSON.parse(localStorage.getItem('testAnswers')) || {};
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [remainingTime, setRemainingTime] = useState(timer);
  
  useEffect(() => {
    localStorage.setItem('testAnswers', JSON.stringify(userAnswers));
  }, [userAnswers]);

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      if (!questions.length) {
        localStorage.removeItem('testAnswers');
        navigate('/', { replace: true });
      }
    }
  }, [questions, navigate, isInitialLoad]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Are you sure you want to leave? Your test progress will be lost.';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    const handlePopState = (_e) => {
      if (window.confirm('Are you sure you want to leave? Your test progress will be lost.')) {
        localStorage.removeItem('testAnswers');
        navigate('/', { replace: true });
      } else {
        window.history.pushState(null, null, window.location.pathname);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleAnswerSelect = (questionId, optionKey) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const handleSubmit = () => {
    let totalWrongAnswers = 0;
    let totalCorrectAnswers = 0;
    let totalUnselectedAnswers = 0;

    const submittedData = questions.map((q) => {
      const isUnselected = userAnswers[q._id] === undefined;
      const isCorrectAnswer = q.correctOption === userAnswers[q._id];

      if (isUnselected) totalUnselectedAnswers++;
      else if (isCorrectAnswer) totalCorrectAnswers++;
      else totalWrongAnswers++;

      return {
        questionId: q._id,
        questionEnglish: q.questionEnglish,
        questionHindi: q.questionHindi,
        questionOptionsEnglish: q.optionsEnglish.map((opt) => ({
          id: opt.key,
          text: opt.value,
        })),
        questionOptionsHindi: q.optionsHindi.map((opt) => ({
          id: opt.key,
          text: opt.value,
        })),
        selectedOption: userAnswers[q._id],
        correctAnswer: { correctOptionId: q.correctOption },
      };
    });

    const timeTaken = timer - remainingTime; // Calculate time taken in seconds

    const resultData = {
      submittedData,
      totalCorrectAnswers,
      totalWrongAnswers,
      totalUnselectedAnswers,
      totalTime: timer, // Original time set
      timeTaken, // Time used until submission
      testFormat
    };

    localStorage.removeItem('testAnswers');
    navigate('/result', { state: resultData });
  };

  const getTimeComponents = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return { hrs, mins, secs };
  };

  const { hrs, mins, secs } = getTimeComponents(remainingTime);

  if (!questions.length || isInitialLoad) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 relative">
      {timer > 0 && (
        <div className="fixed top-0 left-0 right-0 h-20 bg-base-200 p-2 shadow-md z-50 text-center">
          <span className="countdown font-mono text-2xl text-gray-900 dark:text-gray-100">
            <span style={{ '--value': hrs } as React.CSSProperties}></span>:
            <span style={{ '--value': mins } as React.CSSProperties}></span>:
            <span style={{ '--value': secs } as React.CSSProperties}></span>
            <span style={{ '--value': hrs } as React.CSSProperties}></span>:
            <span style={{ '--value': mins } as React.CSSProperties}></span>:
            <span style={{ '--value': secs } as React.CSSProperties}></span>
          </span>
        </div>
      )}

      <div className={timer > 0 ? 'mt-12' : ''}>
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
                  <label
                    key={option._id}
                    className="label cursor-pointer justify-start gap-2 py-3 border-b last:border-b-0 border-gray-200 dark:border-gray-700"
                  >
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
    </div>
  );
};

export default Test;