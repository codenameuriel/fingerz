import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import WordList from '../../components/WordList/WordList';
import WordPanelStyles from './WordPanel.module.css';

class WordPanel extends Component {
  showDisplay() {
    if (this.props.index < this.props.wordList.length) {
      return (
        <> 
         <WordList 
          index={this.props.index} 
          wordList={this.props.wordList}
          disableInput={this.props.onDisableInput}/>
          <input 
          onChange={this.props.onHandleChange}
          disabled={this.props.disabled}
          type="text"
          value={this.props.input}/>
        </>
      );
    } 

    if (this.props.index === this.props.wordList.length) {
      return (
        null
      );
    }
  }

  render() {
    return (
      <div className={WordPanelStyles.WordPanel}>
        {this.showDisplay()}
      </div>
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
    wordList: state.wordPanel.wordList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHandleChange: event => {
      dispatch(actionCreators.handleChange(event));
    },
    onDisableInput: () => {
      dispatch(actionCreators.disableInput());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordPanel);
