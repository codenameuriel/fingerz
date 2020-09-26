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

const increaseIndex = (index) => {
  if (index === 2) index = 0;
  else index = index + 1;

  return {
    type: actionTypes.INCREASE_INDEX,
    payload: {
      index: index
    }
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
  const lastChar = [input.length - 1];

  let isTypedCorrectly = true;
  let isTypedIncorrectly = false;

  for (let i = 0; i < input.length; i++) {
    if (words[index][i] !== input[i]) isTypedIncorrectly = true;
  }

  if (isTypedCorrectly && isTypedIncorrectly) dispatch(showInputError());

  if (input.length === 0 || input[lastChar] === ' ') {
    dispatch(clearInputError());
  }

  if (isTypedCorrectly && !isTypedIncorrectly) dispatch(clearInputError());
};

const loadNextWordRow = () => {
  return {
    type: actionTypes.LOADNEXTWORDROW
  }
};

export const generateWordMatrix = wordMatrix => {
  return {
    type: actionTypes.GENERATEWORDMATRIX,
    payload: {
      matrix: wordMatrix
    }
  };
};

export const handleChange = event => {
  return (dispatch, getState) => {
    // added matrix and wordRowIndex
    const { index, wordList, matrix, startTime, wpmCounter, typoCounter, wordRowIndex } = 
      getState().wordPanel;

    const options = {};
 
    // if still typing words
    // comparison needs to change to matrix[wordRowIndex].length
    // if (index < wordList.length) {
      if (index < matrix[wordRowIndex].length) {
      calculateSpeed(options, dispatch, startTime, 'start');
   
      dispatch(updateStateOnChange(event));
 
      // changed wordList for matrix[wordRowIndex]
      checkForTypo(dispatch, matrix[wordRowIndex], index, event.target.value, typoCounter);
   
      // if space was pressed
      // options needs to use matrix[wordRowIndex] instead of wordList to calculate speed
      if (event.target.value !== event.target.value.trim()) {
        const options = {
          counter: wpmCounter, 
          // words: wordList,
          words: matrix[wordRowIndex],
          index: index
        };

        // options needs to include changes above
        calculateSpeed(options, dispatch, startTime, 'end');
        
        dispatch(clearInput());

        // comparison needs to be made on matrix[wordRowIndex]
        if (index === wordList.length) {
          dispatch(disableInput()); 
        }

        // when the first row of words were typed focus on the next row
        // adds 1 to wordRowIndex
        // check for case when increasing index goes out of bound of the lenght of the matrix
        if (index === 2) dispatch(loadNextWordRow());
      
        // if space was pressed, move on to the next word
        dispatch(increaseIndex(index));
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
