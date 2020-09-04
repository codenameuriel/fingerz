import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

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

  showWord(index) {
    const words = ['queen', 'spiritual', 'twin', 'incense', 'bowl', 'singing', 'noisy', 'sound', 'painting', 'organic'];

    if (this.props.index === words.length) this.props.onDisableInput();

    return words[index];
  }

  render() {
    return (
      <div>
        <h1 
          style={{marginBottom: '-20px'}}>{this.showWord(this.props.index)}
        </h1>

        <h5>
          (Press <span style={{color: 'rgb(231, 231, 149)'}}>SPACE</span> for next word)
        </h5>

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
    disabled: state.wordPanel.disabled
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
