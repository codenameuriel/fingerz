import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import WordList from '../../components/WordList/WordList';
import WordPanelStyles from './WordPanel.module.css';
import WPMSummary from '../../components/WPMSummary/WPMSummary';
import Button from '../../components/UI/Button/Button';

class WordPanel extends Component {
  componentDidMount() {
    this.inputElement.focus();
  }

  componentDidUpdate() {
    const { matrix, wordRowIndex } = this.props;

    if (this.inputElement) this.inputElement.focus();
    if (wordRowIndex === matrix.length) {
      this.props.onShowWPMSummary(); 
    }
  }

  showDisplay() {
    const { 
      showWPMSummary, onDisableInput, onHandleChange, showInputError, input, wpmCounter, onRestartTest, disabled
    } = this.props; 
    
    if (!showWPMSummary) {
      return (
        <div className={WordPanelStyles.WordPanel}>
          <WordList disableInput={onDisableInput} error={showInputError}/>
          {/* <Button text="Randomize Words"/> */}
          <h5>
            (press <span style={{color: 'rgb(231, 231, 149)'}}>space</span> for next word)
          </h5> 
          <input 
            onChange={onHandleChange}
            disabled={disabled}
            style={showInputError ? {backgroundColor: '#9f0000'} : null}
            type="text"
            value={input}
            ref={inputElement => this.inputElement = inputElement}/>
        </div>
      );
    } 

    if (showWPMSummary) {
      return (
        <div className={WordPanelStyles.WPMSummary}>
          <WPMSummary wpmCounter={wpmCounter}/>
          <Button
            text="Restart" 
            handleClick={onRestartTest}/>
        </div>
      );
    }
  }

  render() {
    return (
      <>
        {this.showDisplay()}
      </>
    );
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
    showWPMSummary: state.wordPanel.showWPMSummary
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordPanel);
