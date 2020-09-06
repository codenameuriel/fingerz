import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import WordList from '../../components/WordList/WordList';
import WordPanelStyles from './WordPanel.module.css';

class WordPanel extends Component {
  // handleKeyPress() {
  //   this.setState(prevState => {
  //     const pressedKey = prevState.key;
  //     const pressedKeyStyle = {
  //       color: 'rgb(145, 82, 145)',
  //       backgroundColor: 'rgb(0, 0, 0)',
  //       borderRadius: '5px'
  //     };
  //     pressedKey.value = prevState.typedKey;
  //     pressedKey.style = pressedKeyStyle;

  //     return {
  //       key: pressedKey
  //     }
  //   });
  // }

  // handleOnChange = event => {
  //   this.calculateSpeed('start');

  //   this.setState({
  //     input: event.target.value,
  //     typedKey: event.target.value[event.target.value.length - 1]
  //   });

  //   // if the SPACE key has been pressed
  //   if (event.target.value !== event.target.value.trim()) {
  //     this.calculateSpeed('end');
  //     this.clearInput();
  //   }

  //   this.handleKeyPress();
  //   setTimeout(() => this.clearValues(), 135);
  // }

  // calculateSpeed(type) {
  //   switch(type) {
  //     case 'start':
  //       const start = Date.now();
  //       let startTime;

  //       this.setState(prevState => {
  //         if (this.state.startTime === 0) {
  //           startTime = start;
  //         } else {
  //           startTime = Math.min(prevState.startTime, start);
  //         }

  //         return {
  //           startTime: startTime
  //         };
  //       });

  //       break;
  //     case 'end':
  //       const end = Date.now();

  //       this.setState(prevState => {
  //         return {
  //           endTime: Math.floor((end - prevState.startTime) / 1000)
  //         };
  //       });

  //       console.log(Math.floor(end - this.state.startTime) / 1000);

  //       break;
  //     default: return null;
  //   }
  // }

  // clearValues() {
  //   const clearedKey = {...this.state.key};
  //   const clearedKeyStyle = {...clearedKey.style};
  //   clearedKey.value = '';
  //   clearedKeyStyle.color = '';
  //   clearedKey.style = clearedKeyStyle;

  //   this.setState({
  //     typedKey: '',
  //     key: clearedKey
  //   });
  // }

  // clearInput() {
  //   this.setState({
  //     startTime: 0, 
  //     input: ''
  //   });

  //   this.increaseIndex();
  // }

  // increaseIndex() {
  //   this.setState(prevState => {
  //     return {
  //       index: prevState.index + 1
  //     };
  //   });
  // }

  render() {
    return (
      <div className={WordPanelStyles.WordPanel}>
        <WordList 
          index={this.props.index} 
          wordList={this.props.wordList}
          disableInput={this.props.onDisableInput}/>
        <input 
          onChange={this.props.onHandleChange}
          disabled={this.props.disabled}
          type="text"
          value={this.props.input}/>
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
