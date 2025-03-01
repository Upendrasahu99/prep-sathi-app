// Subjects.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const questionCountOptions = Array.from({ length: 20 }, (_, i) => i + 1);

  const getQuestions = async (topicId) => {
    try {
      const response = await fetch(`http://localhost:5500/api/v1/questions/topic/${topicId}?size=${questionCount}`);
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data.data);
      return data.data;
    } catch (error) {
      console.error('Error fetching questions:', error);
      return null;
    }
  };

  const handleStartTest = async (e) => {
    e.preventDefault();
    if (topic && questionCount > 0) {
      const fetchedQuestions = await getQuestions(topic);
      if (fetchedQuestions) {
        navigate('/test', { state: { questions: fetchedQuestions } });
      }
    } else {
      console.log('Please select a topic and question count');
    }
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('http://localhost:5500/api/v1/subjects');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSubjects(data.data);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <div>
      <ul className="menu bg-base-200 w-full">
        {subjects.map((subject) => (
          <li key={subject._id}>
            <details>
              <summary>{subject.name}</summary>
              <ul>
                {subject.topics.map((topic) => (
                  <li key={topic._id}>
                    <a href="#my_modal_8" onClick={() => setTopic(topic._id)}>
                      {topic.name}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>

      <div className="modal" id="my_modal_8">
        <div className="modal-box">
          <form className="flex flex-col items-center gap-5">
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

            <div className="grid grid-cols-2 gap-5">
              <button className="btn" onClick={handleStartTest}>
                Start Test
              </button>
              <a href="#" className="btn">
                Close
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subjects;