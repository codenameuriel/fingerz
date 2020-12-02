import * as actionTypes from '../actions/actionTypes';

const initialState = {
  words: [],
  filteredWords: [],
  error: '',
  checkedInput: JSON.parse(localStorage.getItem('wordsName')) ? JSON.parse(localStorage.getItem('wordsName')) : 'default'
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
      let filterWords = [...state.words];
      return {
        ...state,
        filteredWords: filterWords.filter(wordList => wordList.category === action.payload.category)
      };
    case actionTypes.CLEAR_FILTERS:
      return {
        ...state,
        filteredWords: []
      };
    case actionTypes.SEARCH_WORDS:
      let searchWords = [...state.words];
      return {
        ...state,
        // where name is identical match or includes
        filteredWords: searchWords.filter(wordList => wordList.name.slice(0, action.payload.name.length) === (action.payload.name))
      };
    default: return state;
  }
};

export default reducer;
