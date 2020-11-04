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
  if (index === 8) index = 0;
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
      let doneTime;
      let stringifiedTime;
      doneTime = options.error ? 0 : end - time;
      stringifiedTime = options.error ? 0 : doneTime.toString().slice(0, 5);
      doneTime = options.error ? 0 : parseFloat(stringifiedTime);

      calcEndTimeAndWPM(options, dispatch, doneTime);
      break;
    default:
      return null;
  } 
};

const updateSpeedCounter = (...args) => {
  const [wpmCounter, wordList, index, endTime] = args;
  const updatedCounter = {...wpmCounter};

  updatedCounter[wordList[index]] = endTime === 0 ? 0 : +(60 / endTime).toFixed(2);
  
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
    type: actionTypes.LOAD_NEXT_WORD_ROW
  }
};

export const generateWordMatrix = wordMatrix => {
  return {
    type: actionTypes.GENERATE_WORD_MATRIX,
    payload: {
      matrix: wordMatrix
    }
  };
};

export const showWPMSummary = () => {
  return {
    type: actionTypes.SHOW_WPM_SUMMARY 
  }
};

const setTimer = dispatch => {
  return setInterval(() => {
    dispatch(minusOneSecond());
  }, 1000);
};

export const stopTimer = timer => {
  clearInterval(timer);
};

// executed when Start button is clicked on Timer
export const startTimer = () => {
  return (dispatch, getState) => {
    const { timerStarted } = getState().wordPanel;

    let timer = setTimer(dispatch);
    setTimeout(() => stopTimer(timer), 60000);

    if (timerStarted) return stopTimer(timer);

    // dispatch(storeTimer(timer)); REMOVE ALL LOGIC
    dispatch(disableInput());
    dispatch(timerStarted());
  };
};

const minusOneSecond = () => {
  return { type: actionTypes.MINUS_ONE_SECOND };
};

const beginTimer = () => {
  return { type: actionTypes.TIMER_STARTED }; 
};

const typedChars = numOfChars => {
  return { 
    type: actionTypes.TYPED_CHARS,
    payload: {
      numOfChars: numOfChars
    }
   };
};

const countTypos = (typedWord, word) => {
  let typoCount = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i] !== typedWord[i]) typoCount ++;
  }

  return {
    type: actionTypes.INCREASE_TYPO_COUNT,
    payload: {
      typoCount: typoCount
    }
  };
};

// redux thunk
export const handleChange = event => {
  return (dispatch, getState) => {
    const { input, index, matrix, startTime, wpmCounter, typoCounter, wordRowIndex, showInputError, time, timerStarted } = 
      getState().wordPanel;

    // start timer
    if (!timerStarted) {
      let timer = setTimer(dispatch);
      setTimeout(() => stopTimer(timer), 60000);
      dispatch(disableInput());
      dispatch(beginTimer());
    }

    let options = {};
 
    // if still typing words
    if (index < matrix[wordRowIndex].length) {
      calculateSpeed(options, dispatch, startTime, 'start');
      dispatch(updateStateOnChange(event));
      checkForTypo(dispatch, matrix[wordRowIndex], index, event.target.value, typoCounter);
  
      // if space was pressed
      if (event.target.value !== event.target.value.trim()) {
        options = {
          counter: wpmCounter,
          words: matrix[wordRowIndex],
          index: index,
          error: showInputError
        };

        calculateSpeed(options, dispatch, startTime, 'end');
        dispatch(clearInput());
        dispatch(countTypos(input, matrix[wordRowIndex][index]));
        dispatch(typedChars(input.length));

        if (time === 0) {
          dispatch(disableInput()); 
        }

        const lastIndexInMatrix = matrix[wordRowIndex].length - 1;
        if (index === lastIndexInMatrix) dispatch(loadNextWordRow());
    
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
