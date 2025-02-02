import { useState, useEffect, useContext } from "react";
import { MainContext } from "../../contexts/MainContextProvider";

const CountdownTimer = () => {
  const {inputTime, startTest, setTotalTimeTaken} = useContext(MainContext);

  // const inputTime= '00:04:49';
  // const startTest = true;
  const [time, setTime] = useState(0);
  
  // Convert inputTime (H:M:S) to total seconds when it changes
  useEffect(() => {
    if (inputTime) {
      const [h, m, s] = inputTime.split(":").map(Number);
      setTime(h * 3600 + m * 60 + s);
    }
  }, [inputTime]);

  // Countdown logic
  useEffect(() => {
    let timer;
    if (startTest && time > 0) {
      timer = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [startTest, time]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <div className="p-5 text-center">

      {/* Daisy UI Countdown */}
      <span className="countdown font-mono text-2xl">
        <span style={{ "--value": hours }}></span>:
        <span style={{ "--value": minutes }}></span>:
        <span style={{ "--value": seconds }}></span>
      </span>
    </div>
  );
};

export default CountdownTimer;
