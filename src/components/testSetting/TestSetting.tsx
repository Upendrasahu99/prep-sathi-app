import React from 'react'

const TestSetting = () => {
  const hours = [0, 1, 2, 3];
  const minutes = [];
  const seconds = [];
  for(let i = 0; i < 60; i++){
    minutes.push(i);
    seconds.push(i);
  }
  return (
    <div className='flex flex-col items-center gap-5'>
      
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Select duration</span>
        </div>
        <div className='grid grid-cols-3 w-full max-w-xs mx-auto'>
          <select className="select select-bordered select-md" defaultValue={0}>
            {hours.map((data, index) => <option key={index} value={data}>{data} hour</option>)}
          </select>

          <select className="select select-bordered select-md" defaultValue={0}>
            {minutes.map((data, index) => <option key={index} value={data}>{data} min</option>)}
          </select>

          <select className="select select-bordered select-md" defaultValue={0}>
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

      <button className="btn btn-wide">Start Test</button>
    </div>
  )
}

export default TestSetting