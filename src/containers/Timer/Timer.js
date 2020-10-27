import React, { Component } from 'react';
import TimerStyles from './Timer.module.css';

class Timer extends Component {
  state = {
    time: 60
  }

  render() {
    let timeDisplay;

    if (this.state.time === 60) {
      timeDisplay = '1:00';
    } else if (this.state.time === 0) {
      timeDisplay = ':00';
    } else {
      timeDisplay = ':' + this.state.time;
    }

    return (
      <div className={TimerStyles.Timer}>
        <p>{timeDisplay}</p>
        <button>Start</button>
      </div>
    );
  }
}

export default Timer;
