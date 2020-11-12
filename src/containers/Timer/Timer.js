import React from 'react';
import TimerStyles from './Timer.module.css';
import { IoIosRefresh } from 'react-icons/io';

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
      <p style={props.time < 10 ? { color: 'red' } : null}>{timeDisplay}</p>
      <IoIosRefresh className={TimerStyles.ResetIcon}
        disable={!props.timerStarted} 
        style={props.timerStarted ? null : { background: 'transparent', height: '75px', color: '#161629', cursor: 'not-allowed' }}
        onClick={() => {
          if (props.timerStarted) props.stopTimer(props.activeTimer)
          }} 
      />
      {/* <button 
        disable={!props.timerStarted} 
        style={props.timerStarted ? null : { backgroundColor: '#161629', cursor: 'not-allowed' }}
        onClick={() => {
          if (props.timerStarted) props.stopTimer(props.activeTimer)
          }}>Restart</button> */}
    </div>
  );
};

export default Timer;
