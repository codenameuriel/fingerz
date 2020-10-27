import React, { Component } from 'react';
import TimerStyles from './Timer.module.css';

class Timer extends Component {
  state = {
    time: 60
  }

  minusOneSecond = () => {
    this.setState(prevState => ({ time: prevState.time - 1 }));
  }

  startTimer = () => {
    let timer = setInterval(this.minusOneSecond, 1000);
    setTimeout(() => clearInterval(timer), 60000);
  }

  render() {
    let timeDisplay;

    if (this.state.time === 60) {
      timeDisplay = '1:00';
    } else if (this.state.time < 10) {
      timeDisplay = ':0' + this.state.time;
    } else {
      timeDisplay = ':' + this.state.time;
    }

    return (
      <div className={TimerStyles.Timer}>
        <p>{timeDisplay}</p>
        <button onClick={this.startTimer}>Start</button>
      </div>
    );
  }
}

export default Timer;
