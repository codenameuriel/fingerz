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

const clearValues = () => {
  return {
    type: actionTypes.CLEAR_VALUES
  }
};

const increaseIndex = () => {
  return {
    type: actionTypes.INCREASE_INDEX
  }
};

export const disableInput = () => {
  return {
    type: actionTypes.DISABLE_INPUT
  }
};

const startTime = (time) => {
  return {
    type: actionTypes.START_TIME,
    payload: {
      startTime: time
    }
  };
};

const endTime = (time) => {
  return {
    type: 'END_TIME',
    payload: {
      endTime: time
    }
  };
};

const calculateSpeed = (dispatch, time, type) => {
  switch(type) {
    case 'start':
      const start = Date.now() / 1000;
      let beginTime;

      beginTime = time === 0 ? start : Math.min(time, start);
      console.log(beginTime);
      console.log((beginTime / 1000));
      
      dispatch(startTime(beginTime));
      break;
    case 'end':
      const end = Date.now() / 1000;
      console.log(end);
      const doneTime = Math.floor((end - time));
      console.log(doneTime.toFixed(3));

      dispatch(endTime(doneTime));
      break;
    default:
      return null;
  } 
}; 

 
export const handleChange = event => {
  return (dispatch, getState) => {
    const {index, wordList, startTime } = getState().wordPanel;

    calculateSpeed(dispatch, startTime, 'start');

    dispatch(updateStateOnChange(event));

    if (event.target.value !== event.target.value.trim()) {
      calculateSpeed(dispatch, startTime, 'end');
      dispatch(clearInput());

      if (index === wordList.length) {
        dispatch(disableInput()); 
      }
     
      dispatch(increaseIndex());
    }

    dispatch(handleKeyPress());
    setTimeout(() => dispatch(clearValues()), 140);
  }
};

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