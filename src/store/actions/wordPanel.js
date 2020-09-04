// wordPanel action creators

import * as actionTypes from './actionTypes';

const handleKeyPress = () => {
  return {
    type: actionTypes.HANDLE_KEY_PRESS
  };
};

const updateStateOnChange = event => {
  return {
    type: actionTypes.HANDLE_CHANGE,
    payload: {
      input: event.target.value,
      typedKey: event.target.value[event.target.value.length - 1]
    }
  };
};

 // clearInput() {
  //   this.setState({
  //     startTime: 0, 
  //     input: ''
  //   });

  //   this.increaseIndex();
  // }

const clearInput = () => {
  return {
    type: actionTypes.CLEAR_INPUT
  }
};
 
export const handleChange = event => {
  return dispatch => {
    dispatch(updateStateOnChange(event));

    if (event.target.value !== event.target.value.trim()) {
      dispatch(clearInput());
    }
    
    dispatch(handleKeyPress());
  }
};



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