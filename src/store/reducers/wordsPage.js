import * as actionTypes from '../actions/actionTypes';

const initialState = {
  words: []
};

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_WORDS:
      return {
        ...state,
        words: action.payload.words
      };
    default: return state;
  }
};

export default reducer;
