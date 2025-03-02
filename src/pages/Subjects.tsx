import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Subjects: React.FC = () => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [testType, setTestType] = useState('full');
  const [questionHours] = useState(0); // Fixed to 0 for One by One
  const [questionMinutes, setQuestionMinutes] = useState(0);
  const [questionSeconds, setQuestionSeconds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const questionCountOptions = Array.from({ length: 20 }, (_, i) => i + 1);
  const hourOptions = Array.from({ length: 4 }, (_, i) => i);
  const minuteSecondOptions = Array.from({ length: 60 }, (_, i) => i);

  const API_URL = 'http://localhost:5500';
  const SUBJECTS_STORAGE_KEY = 'cachedSubjects';
  const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000;

  const getQuestions = async (topicId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/v1/questions/topic/${topicId}?size=${questionCount}`);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError('Failed to load questions. Please try again.');
      return null;
    }
  };

  const handleStartTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) {
      setError('Please select a topic.');
      return;
    }
    if (questionCount <= 0) {
      setError('Please select at least one question.');
      return;
    }

    const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
    const questionTimeInSeconds = questionMinutes * 60 + questionSeconds;

    if (testType === 'full' && totalTimeInSeconds <= 0) {
      setError('Please set a valid timer for Full Test (at least 1 second).');
      return;
    }
    if (testType === 'oneByOne' && questionTimeInSeconds <= 0) {
      setError('Please set a valid per-question timer for One by One mode (at least 1 second).');
      return;
    }

    setLoading(true);
    const fetchedQuestions = await getQuestions(topic);
    setLoading(false);

    if (fetchedQuestions) {
      navigate(testType === 'full' ? '/test' : '/test-one-by-one', {
        state: {
          questions: fetchedQuestions,
          timer: testType === 'full' ? totalTimeInSeconds : 0,
          testType,
          questionTimer: testType === 'oneByOne' ? questionTimeInSeconds : 0,
        },
      });
    } else {
      setError('Could not start test. Please try again.');
    }
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      const cachedSubjects = localStorage.getItem(SUBJECTS_STORAGE_KEY);
      let parsedCache = cachedSubjects ? JSON.parse(cachedSubjects) : null;

      if (parsedCache && Date.now() - parsedCache.timestamp < CACHE_EXPIRY_MS) {
        setSubjects(parsedCache.data);
        setLoading(false);
      } else {
        setLoading(true);
      }

      try {
        const response = await fetch(`${API_URL}/api/v1/subjects`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSubjects(data.data);
        localStorage.setItem(
          SUBJECTS_STORAGE_KEY,
          JSON.stringify({ data: data.data, timestamp: Date.now() })
        );
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
        if (!parsedCache) {
          setError('Failed to load subjects. Please refresh the page.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) {
    return <div className="text-center">Loading subjects...</div>;
  }

  if (error && !isModalOpen) {
    return <div className="text-center text-error">{error}</div>;
  }

  return (
    <div>
      <ul className="menu bg-base-200 w-full">
        {subjects.map((subject) => (
          <li key={subject._id}>
            <details>
              <summary>{subject.name}</summary>
              <ul>
                {subject.topics.map((topic: any) => (
                  <li key={topic._id}>
                    <button
                      onClick={() => {
                        setTopic(topic._id);
                        setIsModalOpen(true);
                      }}
                    >
                      {topic.name}
                    </button>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <form className="flex flex-col items-center gap-5" onSubmit={handleStartTest}>
              {error && (
                <div className="alert alert-error">
                  <span>{error}</span>
                </div>
              )}

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Question Count</span>
                </div>
                <select
                  className="select select-bordered select-md"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                >
                  <option value={0}>Select number of questions</option>
                  {questionCountOptions.map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Test Type</span>
                </div>
                <select
                  className="select select-bordered select-md"
                  value={testType}
                  onChange={(e) => setTestType(e.target.value)}
                >
                  <option value="full">Full Test</option>
                  <option value="oneByOne">One by One</option>
                </select>
              </label>

              {testType === 'full' && (
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Set Total Timer (HH:MM:SS)</span>
                  </div>
                  <div className="flex gap-2">
                    <select
                      className="select select-bordered select-md w-1/3"
                      value={hours}
                      onChange={(e) => setHours(parseInt(e.target.value))}
                    >
                      {hourOptions.map((h) => (
                        <option key={h} value={h}>
                          {h.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <select
                      className="select select-bordered select-md w-1/3"
                      value={minutes}
                      onChange={(e) => setMinutes(parseInt(e.target.value))}
                    >
                      {minuteSecondOptions.map((m) => (
                        <option key={m} value={m}>
                          {m.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <select
                      className="select select-bordered select-md w-1/3"
                      value={seconds}
                      onChange={(e) => setSeconds(parseInt(e.target.value))}
                    >
                      {minuteSecondOptions.map((s) => (
                        <option key={s} value={s}>
                          {s.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              )}

              {testType === 'oneByOne' && (
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Set Per-Question Timer (MM:SS)</span>
                  </div>
                  <div className="flex gap-2">
                    <select
                      className="select select-bordered select-md w-1/2"
                      value={questionMinutes}
                      onChange={(e) => setQuestionMinutes(parseInt(e.target.value))}
                    >
                      {minuteSecondOptions.map((m) => (
                        <option key={m} value={m}>
                          {m.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <select
                      className="select select-bordered select-md w-1/2"
                      value={questionSeconds}
                      onChange={(e) => setQuestionSeconds(parseInt(e.target.value))}
                    >
                      {minuteSecondOptions.map((s) => (
                        <option key={s} value={s}>
                          {s.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                </label>
              )}

              <div className="grid grid-cols-2 gap-5">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Starting...' : 'Start Test'}
                </button>
                <button className="btn" onClick={() => {
                  setIsModalOpen(false);
                  setError(null); // Clear error on close
                }}>
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;