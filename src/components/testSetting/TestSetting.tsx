import React from 'react'

const TestSetting = () => {
  const hours = [1, 2, 3];
  const minutes = [];
  const seconds = [];
  for(let i = 0; i < 60; i++){
    minutes.push(i);
    seconds.push(i);
  }
  return (
    <div>
      <div>
        <p>Select duration</p>
        <select className="select select-bordered " defaultValue='hour'>
          <option disabled value='hour'>hour</option>
          {
            hours.map((data, index) => <option key={index} value={data}>{data}</option>)
          }
        </select>
        <select className="select select-bordered " defaultValue='min'>
          <option disabled value='min'>min</option>
          {
            minutes.map((data, index) => <option key={index} value={data}>{data}</option>)
          }
        </select>
        <select className="select select-bordered " defaultValue='sec'>
          <option disabled value='sec'>sec</option>
          {
            seconds.map((data, index) => <option key={index} value={data}>{data}</option>)
          }
        </select>
      </div>

    </div>
  )
}

export default TestSetting