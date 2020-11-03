import React from 'react';
import TimerStyles from './Timer.module.css';

const Timer = props => {
  let timeDisplay;

  if (props.time === 60) {
    timeDisplay = '1:00';
  } else if (props.time < 10) {
    timeDisplay = ':0' + props.time;
  } else {
    timeDisplay = ':' + props.time;
  }

  return (
    <div className={TimerStyles.Timer}>
      <p>{timeDisplay}</p>
      <button onClick={() => {
        props.disableInput()
        props.startTimer()
        }}>Start</button>
    </div>
  );
};

export default Timer;
