import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import WordList from '../../components/WordList/WordList';
import WordPanelStyles from './WordPanel.module.css';
import WPMSummary from '../../components/WPMSummary/WPMSummary';
import Timer from '../Timer/Timer';

class WordPanel extends Component {
  componentDidUpdate() {
    const { time, onShowWPMSummary } = this.props;

    if (this.inputElement) this.inputElement.focus();
    if (time === 0) onShowWPMSummary();
  }
 
  showDisplay() {
    const { 
      showWPMSummary, onHandleChange, showInputError, input, wpmCounter, onRestartTest, disabled, time, typedChars, typoCount, onStopTimer, activeTimer, timerStarted, onDisableInput
    } = this.props; 
    
    if (!showWPMSummary) {
      return (
        <div className={WordPanelStyles.WordPanel}>
          <WordList error={showInputError}/>
          {/* rgb(231, 231, 149) - aternative color */}
          <Timer 
            time={time} 
            stopTimer={onStopTimer} 
            activeTimer={activeTimer} 
            timerStarted={timerStarted}/>
          <p className={WordPanelStyles.Direction}>
            press <span style={{color: '#00e6e6'}}>space</span> for next word
          </p> 
          <input 
            onChange={onHandleChange}
            disabled={disabled}
            // style={showInputError ? {backgroundColor: '#9f0000'} : null}
            type="text"
            value={input}
            style={disabled ? {cursor: 'not-allowed', backgroundColor: '#161629'} : null}
            ref={inputElement => this.inputElement = inputElement}/>
        </div>
      );
    } 

    if (showWPMSummary) {
      return (
        <WPMSummary 
          wpmCounter={wpmCounter} 
          onRestartTest={onRestartTest} 
          typedChars={typedChars} 
          typoCount={typoCount}
          onDisableInput={onDisableInput}/>
      );
    }
  }

  render() {
    return this.showDisplay()
  }
}

const mapStateToProps = state => {
  return {
    startTime: state.wordPanel.startTime,
    index: state.wordPanel.index,
    input: state.wordPanel.input,
    pressedKey: state.wordPanel.pressedKey,
    disabled: state.wordPanel.disabled,
    wordList: state.wordPanel.wordList,
    wpmCounter: state.wordPanel.wpmCounter,
    showInputError: state.wordPanel.showInputError,
    wordRowIndex: state.wordPanel.wordRowIndex,
    matrix: state.wordPanel.matrix,
    showWPMSummary: state.wordPanel.showWPMSummary,
    time: state.wordPanel.time,
    typedChars: state.wordPanel.typedChars,
    typoCount: state.wordPanel.typoCount,
    activeTimer: state.wordPanel.activeTimer,
    timerStarted: state.wordPanel.timerStarted
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHandleChange: event => dispatch(actionCreators.handleChange(event)),
    onRestartTest: () => dispatch(actionCreators.restartTest()),
    onShowWPMSummary: () => dispatch(actionCreators.showWPMSummary()),
    onStopTimer: timer => dispatch(actionCreators.stopAndReset(timer)),
    onDisableInput: () => dispatch(actionCreators.disableInput())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordPanel);
