import * as actionTypes from '../actions/actionTypes';

const initialState = {
  pressedKey: {
    value: '',
    style: {}
  },
  startTime: 0,
  endTime: 0,
  index: 0,
  input: '',
  typedKey: '',
  disabled: false,
  wordList: ['would', 'being', 'without', 'look', 'even', 'something', 'made', 'people', 'home', 'large', 'number', 'same', 'seem', 'word', 'is', 'where', 'so', 'he', 'that', 'girl', 'go', 'saw', 'few', 'by', 'the', 'you', 'what', 'give', 'not', 'could', 'after', 'than', 'off', 'great', 'live', 'very'],
  wpmCounter: {},
  showInputError: false,
  typoCounter: [],
  wordRowIndex: 0,
  matrix: [],
  showWPMSummary: false
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.HANDLE_KEY_PRESS:
      const pressedKey = {...state.pressedKey};
      const pressedKeyStyle = {
        color: 'white',
        backgroundColor: '#3d253c'
      };
      pressedKey.value = state.typedKey;
      pressedKey.style = pressedKeyStyle;

      return {
        ...state,
        pressedKey: pressedKey
      };
    case actionTypes.HANDLE_CHANGE:
      return {
        ...state,
        input: action.payload.input,
        typedKey: action.payload.typedKey
      };
    case actionTypes.CLEAR_INPUT:
      return {
        ...state, 
        startTime: 0,
        input: ''
      };
    case actionTypes.CLEAR_VALUES:
      const clearedKey = {...state.pressedKey};
      const clearedKeyStyle = {...clearedKey.style};
      clearedKey.value = '';
      clearedKeyStyle.color = '';
      clearedKey.style = clearedKeyStyle;

      return {
        ...state,
        typedKey: '',
        pressedKey: clearedKey
      };
    case actionTypes.INCREASE_INDEX:
      return {
        ...state,
        index: action.payload.index
      };
    case actionTypes.DISABLE_INPUT:
      return {
        ...state, 
        disabled: true
      };
    case actionTypes.START_TIME:
      return {
        ...state,
        startTime: action.payload.startTime
      };
    case actionTypes.END_TIME:
      return {
        ...state, 
        endTime: action.payload.endTime
      };
    case actionTypes.UPDATE_WPM_COUNTER:
      return {
        ...state, 
        wpmCounter: action.payload.wpmCounter
      };
    case actionTypes.RESTART_TEST:
      const restartPressedKey = {...state.pressedKey};
      const restartPressedKeyStyle = {};
      restartPressedKey.value = '';
      restartPressedKey.style = restartPressedKeyStyle;
      
      return {
        ...state,
        pressedKey: restartPressedKey,
        endTime: 0,
        index: 0,
        wpmCounter: {},
        wordRowIndex: 0,
        showWPMSummary: false
      }
    case actionTypes.SHOW_INPUT_ERROR:
      return {
        ...state,
        showInputError: true
      };
    case actionTypes.CLEAR_INPUT_ERROR:
      return {
        ...state, 
        showInputError: false
      };
    case actionTypes.LOAD_NEXT_WORD_ROW:
      return {
        ...state,
        wordRowIndex: state.wordRowIndex + 1
      }
     case actionTypes.GENERATE_WORD_MATRIX: 
      return {
        ...state,
        matrix: action.payload.matrix
      }
    case actionTypes.SHOW_WPM_SUMMARY:
      return {
        ...state,
        showWPMSummary: true
      }
    case actionTypes.SET_WORD_LIST:
      return {
        ...state, 
        wordList: action.payload.wordList
      }
    default: return state;
  }
};

export default reducer;
