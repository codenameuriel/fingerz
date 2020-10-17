import * as actionTypes from './actionTypes';

export const loadWords = words => {
  return {
    type: actionTypes.LOAD_WORDS,
    payload: {
      words: words
    }
  }
};
