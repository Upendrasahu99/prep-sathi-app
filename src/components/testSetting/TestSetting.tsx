import React, { useState, useContext, useEffect } from 'react'
import { MainContext } from '../../contexts/MainContextProvider';
import { useNavigate } from 'react-router-dom';
const TestSetting = () => {
  const {setInputTime, setStartTest, setStartTime, subject} = useContext(MainContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(subject === ''){
      navigate('/subjects')
    }  
  },[])

  const hours = [0, 1, 2, 3];
  const minutes = [];
  const seconds = [];
  const [inputHour, setInputHour] = useState(0);
  const [inputMinute, setInputMinute] = useState(0);
  const [inputSecond, setInputSecond] = useState(0);
  
  for(let i = 0; i < 60; i++){
    minutes.push(i);
    seconds.push(i);
  }

  const handleStartTest = () => {
    setStartTime(Date.now());
    setInputTime(`${inputHour}:${inputMinute}:${inputSecond}`)
    setStartTest(true)
  }
  return (
    <div className='flex flex-col items-center gap-5'>
      
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Select duration</span>
        </div>
        <div className='grid grid-cols-3 w-full max-w-xs mx-auto'>
          <select className="select select-bordered select-md" defaultValue={0} onChange={(e) => setInputHour(`${e.target.value}`)}>
            {hours.map((data, index) => <option key={index} value={data}>{data} hour</option>)}
          </select>

          <select className="select select-bordered select-md" defaultValue={0} onChange={(e) => setInputMinute(`${e.target.value}`)}>
            {minutes.map((data, index) => <option key={index} value={data}>{data} min</option>)}
          </select>

          <select className="select select-bordered select-md" defaultValue={0} onChange={(e) => setInputSecond(`${e.target.value}`)}>
            {seconds.map((data, index) => <option key={index} value={data}>{data} sec</option>)}
          </select>
        </div>
      </label>
      
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Question Count</span>
        </div>
        <input type="text" placeholder="Type here" className="input input-md input-bordered w-full" />
      </label>

      <button className="btn btn-wide" onClick={handleStartTest}>Start Test</button>
    </div>
  )
}

export default TestSetting