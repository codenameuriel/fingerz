import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import WordList from '../../components/WordList/WordList';
import WordPanelStyles from './WordPanel.module.css';
import WPMSummary from '../../components/WPMSummary/WPMSummary';
import Timer from '../Timer/Timer';

class WordPanel extends Component {
  // componentDidMount() {
  //   this.inputElement.focus();
  // }

  componentDidUpdate() {
    // const { matrix, wordRowIndex } = this.props;

    if (this.inputElement) this.inputElement.focus();
    // if (wordRowIndex === matrix.length) {
    //   this.props.onShowWPMSummary(); 
    // }
    if (this.props.time === 0) this.props.onShowWPMSummary();
  }

  showDisplay() {
    const { 
      showWPMSummary, onDisableInput, onHandleChange, showInputError, input, wpmCounter, onRestartTest, disabled, onStartTimer, time, typedChars, typoCount
    } = this.props; 
    
    if (!showWPMSummary) {
      return (
        <div className={WordPanelStyles.WordPanel}>
          <WordList disableInput={onDisableInput} error={showInputError}/>
          {/* rgb(231, 231, 149) - aternative color */}
          <Timer disableInput={onDisableInput} startTimer={onStartTimer} time={time}/>
          <h5>
            (press <span style={{color: '#00e6e6'}}>space</span> for next word)
          </h5> 
          <input 
            onChange={onHandleChange}
            disabled={disabled}
            // style={showInputError ? {backgroundColor: '#9f0000'} : null}
            type="text"
            value={input}
            style={this.props.disabled ? {cursor: 'not-allowed', backgroundColor: '#161629'} : null}
            ref={inputElement => this.inputElement = inputElement}/>
        </div>
      );
    } 

    if (showWPMSummary) {
      return (
        <WPMSummary wpmCounter={wpmCounter} onRestartTest={onRestartTest} typedChars={typedChars} typoCount={typoCount}/>
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
    typoCount: state.wordPanel.typoCount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHandleChange: event => {
      dispatch(actionCreators.handleChange(event));
    },
    onDisableInput: () => {
      dispatch(actionCreators.disableInput());
    },
    onRestartTest: () => {
      dispatch(actionCreators.restartTest());
    },
    onShowWPMSummary: () => {
      dispatch(actionCreators.showWPMSummary());
    },
    onStartTimer: () => dispatch(actionCreators.startTimer())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordPanel);
