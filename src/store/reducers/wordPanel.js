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
  wordList: ['queen', 'articulate', 'spiritual', 'twin', 'incense', 'bowl', 'singing', 'noisy', 'sound', 'painting', 'organic']
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.HANDLE_KEY_PRESS:
      const pressedKey = {...state.pressedKey};
      const pressedKeyStyle = {
        color: 'rgb(145, 82, 145)',
        backgroundColor: 'rgb(0, 0, 0)',
        borderRadius: '5px'
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
    default: return state;
  }
};

export default reducer;

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
