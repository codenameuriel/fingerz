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

const clearInput = () => {
  return {
    type: actionTypes.CLEAR_INPUT
  };
};

const clearValues = () => {
  return {
    type: actionTypes.CLEAR_VALUES
  };
};

const increaseIndex = () => {
  return {
    type: actionTypes.INCREASE_INDEX
  };
};

export const disableInput = () => {
  return {
    type: actionTypes.DISABLE_INPUT
  };
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

const calcEndTimeAndWPM = (...args) => {
  const [options, dispatch, doneTime] = args;
  const { counter, words, index } = options;

  dispatch(endTime(doneTime));
  dispatch(updateSpeedCounter(counter, words, index, doneTime));
}

const calculateSpeed = (...args) => {
  const [options, dispatch, time, type] = args;

  switch(type) {
    case 'start':
      const start = Date.now() / 1000;
      let beginTime;

      beginTime = time === 0 ? start : Math.min(time, start);
      
      dispatch(startTime(beginTime));
      break;
    case 'end':
      const end = Date.now() / 1000;
      let doneTime = end - time;
      let stringifiedTime = doneTime.toString().slice(0, 5);
      doneTime = parseFloat(stringifiedTime);
      
      calcEndTimeAndWPM(options, dispatch, doneTime);
      break;
    default:
      return null;
  } 
};

const updateSpeedCounter = (...args) => {
  const [wpmCounter, wordList, index, endTime] = args;
  const updatedCounter = {...wpmCounter};

  updatedCounter[wordList[index]] = +(60 / endTime).toFixed(2);
  console.log(updatedCounter);

  return {
    type: actionTypes.UPDATE_WPM_COUNTER,
    payload: {
      wpmCounter: updatedCounter
    }
  };
};

const showInputError = () => {
  return {
    type: actionTypes.SHOW_INPUT_ERROR
  };
};

const clearInputError = () => {
  return {
    type: actionTypes.CLEAR_INPUT_ERROR
  };
};

const checkForTypo = (...args) => {
  const [dispatch, words, index, input] = args;

  if (words[index][input.length - 1] !== input[input.length -1]) {
    console.log('you have a typo');
    dispatch(showInputError());
  } else {
    dispatch(clearInputError());
  }
};

export const handleChange = event => {
  return (dispatch, getState) => {
    const { index, wordList, startTime, wpmCounter } = 
      getState().wordPanel;

    const options = {};
  
    if (index < wordList.length) {
      calculateSpeed(options, dispatch, startTime, 'start');
   
      dispatch(updateStateOnChange(event));
 
      checkForTypo(dispatch, wordList, index, event.target.value);
    
      if (event.target.value !== event.target.value.trim()) {
        const options = {
          counter: wpmCounter, 
          words: wordList,
          index: index
        };

        calculateSpeed(options, dispatch, startTime, 'end');
        
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
};

export const restartTest = () => {
  return {
    type: actionTypes.RESTART_TEST
  };
};