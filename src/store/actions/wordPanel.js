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
  const { counter, words, index, _error, numOfTypedChars, numOfTypos } = options;
  const speedCounterData = {
    counter,
    words,
    index,
    doneTime,
    numOfTypedChars,
    numOfTypos
  };

  dispatch(endTime(doneTime));
  dispatch(updateSpeedCounter(speedCounterData));
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

const updateSpeedCounter = dataObj => {
  const { 
    counter, words, index, doneTime, numOfTypedChars, numOfTypos
   } = dataObj;
  const updatedCounter = {...counter};

  // prevents NaN when typing word and timer runs out
  if (doneTime < 0) doneTime = 0;
  const timeInSec = .0166 * doneTime;
  const grossWPM = Math.ceil((numOfTypedChars / 5) / timeInSec);
  const netWPM = grossWPM - numOfTypos;
  let score;

  // first check if key exist
  if (updatedCounter[words[index]]) {
    score = +((updatedCounter[words[index]] + netWPM) / 2).toFixed(2); 
    updatedCounter[words[index]] = score;
  } else {
    // creating k:v
    score = +(netWPM).toFixed(2);
    if (score < 0) score = 0;
    updatedCounter[words[index]] = doneTime === 0 ? 0 : score;
  }
  
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

const minusOneSecond = () => {
  return { type: actionTypes.MINUS_ONE_SECOND };
};

// starts decrementing seconds
const setTimer = dispatch => {
  return setInterval(() => {
    dispatch(minusOneSecond());
  }, 1000);
};

const stopTimer = timer => {
  clearInterval(timer);
  return {
    type: actionTypes.STOP_TIMER
  };
}

export const stopAndReset = timer => {
  return dispatch => {
    dispatch(stopTimer(timer));
    dispatch(restartTest());
  }
};

const storeTimer = timer => {
  return {
    type: actionTypes.STORE_TIMER,
    payload: {
      timer: timer
    }
  }
};

// sets the timer to start and when to end
const startTimer = (dispatch, timerStarted) => {
  let timer;
  // starts the timer only once
  if (!timerStarted) {
    timer = setTimer(dispatch);
    dispatch(storeTimer(timer));
    setTimeout(() => {
      stopTimer(timer);
      // dispatch(disableInput());
    }, 60000);
    dispatch(beginTimer());
  }

  return timer;
};

// track when timer has started
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

const increaseTypoCount = numOfTypos => {
  return {
    type: actionTypes.INCREASE_TYPO_COUNT,
    payload: {
      typoCount: numOfTypos
    }
  }; 
};

const countTypos = (typedWord, word) => {
  let typoCount = 0;

  for (let i = 0; i < word.length; i++) {
    if (word[i] !== typedWord[i]) typoCount ++;
  }

  return typoCount;
};

// redux thunk
export const handleChange = event => {
  return (dispatch, getState) => {
    const { 
      input, index, matrix, startTime, wpmCounter, typoCounter, wordRowIndex, showInputError, timerStarted 
    } = getState().wordPanel;

    startTimer(dispatch, timerStarted);

    let options = {};
 
    // if still typing words
    if (index < matrix[wordRowIndex].length) {
      calculateSpeed(options, dispatch, startTime, 'start');
      dispatch(updateStateOnChange(event));
      checkForTypo(dispatch, matrix[wordRowIndex], index, event.target.value, typoCounter);
  
      // if space was pressed
      if (event.target.value !== event.target.value.trim()) {
        let currWord = matrix[wordRowIndex][index];
        let numOfTypos = countTypos(input, currWord);

        options = {
          counter: wpmCounter,
          words: matrix[wordRowIndex],
          index,
          error: showInputError,
          numOfTypedChars: input.length,
          numOfTypos
        };

        calculateSpeed(options, dispatch, startTime, 'end');
        dispatch(clearInput());
        dispatch(increaseTypoCount(numOfTypos));
        dispatch(typedChars(input.length));

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
