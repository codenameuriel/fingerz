import React, { Component } from 'react';
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
    if (this.inputElement) this.inputElement.focus();
    if (this.props.wordRowIndex === this.props.matrix.length) {
      this.props.onShowWPMSummary(); 
    }
  }

  showDisplay() {
    if (!this.props.showWPMSummary) {
      return (
        <div className={WordPanelStyles.WordPanel}>
         <WordList 
            disableInput={this.props.onDisableInput}/>
          <input 
            onChange={this.props.onHandleChange}
            disabled={this.props.disabled}
            style={this.props.showInputError ? {backgroundColor: 'red'} : null}
            type="text"
            value={this.props.input}
            ref={inputElement => this.inputElement = inputElement}/>
        </div>
      );
    } 

    if (this.props.showWPMSummary) {
      return (
        <div className={WordPanelStyles.WPMSummary}>
          <WPMSummary wpmCounter={this.props.wpmCounter}/>
          <Button
            text="Restart" 
            handleClick={this.props.onRestartTest}/>
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
