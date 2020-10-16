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
  // wordList: ['baby', 'back', 'backlash', 'balance', 'banking', 'baseball', 'bathroom', 'basic', 'better', 'below', 'basketball', 'barely', 'biggest', 'billionaire', 'board', 'blame', 'birth', 'blog', 'bold', 'breakthrough', 'brain', 'branch', 'brand', 'bridge', 'both', 'boost', 'break', 'born', 'brief', 'beautiful', 'backpack', 'boot', 'border', 'brunch', 'buyer', 'bypass', 'business', 'bullet', 'broker', 'brilliant', 'broadband', 'brightness', 'breached', 'book', 'boss'],
  // wordList: [
  //   'grass', 'grease','race', 'Swedes', 'Qatar', 'Greece', 'verde', 'terse', 'tweed', 'west', 'east', 'gas', 'far', 'as', 'geez', 'we', 'sat', 'cart', 'tree', 'faster', 'fast', 'reverberate', 'cascade', 'greatest', 'accrete', 'abracadabra', 'defaced', 'redfaced', 'barge', 'tweet', 'retract', 'drag', 'starve', 'water', 'effect', 'state'
  // ],
  wordList: [
    'lollipop', 'monopoly', 'polyphony', 'jumpily', 'pool', 'holly', 'homonym', 'lumpy', 'million', 'kimono', 'pippin', 'pompom', 'unholy', 'hippo', 'nylon', 'nymph', 'onion', 'puppy', 'union', 'molly', 'minimum', 'opinion', 'milky', 'kill', 'you', 'hippy', 'mop', 'yolk', 'oily', 'knoll', 'hypophyllium', 'honk', 'hook', 'kinky', 'upon', 'linkup'
  ],     
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
    default: return state;
  }
};

export default reducer;
