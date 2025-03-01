import React, { useState, useContext, useEffect } from 'react'
import { MainContext } from '../../contexts/MainContextProvider';
import { useNavigate } from 'react-router-dom';
const TestSetting = () => {
  const navigate = useNavigate();
  const {setInputTime, setStartTest, setStartTime} = useContext(MainContext);


  const hours = [0, 1, 2, 3];
  const minutes = [];
  const seconds = [];
  const [inputHour, setInputHour] = useState(0);
  const [inputMinute, setInputMinute] = useState(0);
  const [inputSecond, setInputSecond] = useState(0);
  const questonCount = [];
  
  for(let i = 1; i < 21; i++){
    questonCount.push(i);
  }

  for(let i = 0; i < 60; i++){
    minutes.push(i);
    seconds.push(i);
  }

  const handleStartTest = () => {
    setStartTime(Date.now());
    setInputTime(`${inputHour}:${inputMinute}:${inputSecond}`)
    setStartTest(true);
  }
  return (
    <form className='flex flex-col items-center gap-5'>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Select Mode</span>
        </div>
        <select className="select select-bordered select-md" defaultValue={'full-test'}>
            <option value={'single-question'} disabled>Single Question</option> 
            <option value={'full-test'} >Full Test</option>
        </select>
      </label>

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
        <select className="select select-bordered select-md" defaultValue={0} onChange={(e) => setInputHour(`${e.target.value}`)}>
            {questonCount.map((data, index) => <option key={index} value={data}>{data}</option>)}
        </select>
      </label>
      
      <div className='grid grid-cols-2 gap-5'>
        <button className="btn" onClick={handleStartTest}>Start Test</button>
        <a href="#" className="btn">Close</a>
      </div>

    </form>
  )
}

export default TestSetting;