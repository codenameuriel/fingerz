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
  wordList: ['atrocious', 'excellent', 'articulate', 'spiritual', 'always', 'incense', 'basketball', 'singing', 'noisy', 'reverberate', 'painting', 'organic'],
  wpmCounter: {},
  showInputError: false
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.HANDLE_KEY_PRESS:
      const pressedKey = {...state.pressedKey};
      const pressedKeyStyle = {
        color: 'rgb(145, 82, 145)',
        backgroundColor: 'rgb(0, 0, 0)'
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
        index: state.index + 1
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
        wpmCounter: {}
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
    default: return state;
  }
};

export default reducer;
