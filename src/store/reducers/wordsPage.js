import * as actionTypes from '../actions/actionTypes';

const initialState = {
  words: [],
  filteredWords: [],
  error: '',
  checkedInput: null
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHECKED_INPUT:
      return {
        ...state, 
        checkedInput: action.payload.checkedInput
      };
    case actionTypes.SET_WORDS:
      return {
        ...state,
        words: action.payload.words
      };
    case actionTypes.GET_WORDS_FAILED:
      return {
        ...state,
        error: action.payload.error
      };
    case actionTypes.FILTER_WORDS:
      let wordsCopy = [...state.words];
      return {
        ...state,
        filteredWords: wordsCopy.filter(wordList => wordList.category === action.payload.category)
      }
    default: return state;
  }
};

export default reducer;
