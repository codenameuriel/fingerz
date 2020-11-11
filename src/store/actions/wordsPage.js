import * as actionTypes from './actionTypes';
import axios from 'axios';

export const checkedInput = (event, words) => {
  return dispatch => {
    dispatch(setCheckedInput(event));
    dispatch(setWordList(words));
  };
}

const setCheckedInput = event => {
  return {
    type: actionTypes.SET_CHECKED_INPUT,
    payload: {
      checkedInput: event.target.name
    }
  };
};

const setWordList = words => {
  return {
    type: actionTypes.SET_WORD_LIST,
    payload: {
      wordList: words
    }
  };
};

const setWords = words => {
  return {
    type: actionTypes.SET_WORDS,
    payload: {
      words: words
    }
  };
};

const getWordsFailed = error => {
  return {
    type: actionTypes.GET_WORDS_FAILED,
    payload: {
      error: error
    }
  };
};

const getWords = async (dispatch) => {
  try {
    let words = await (await axios.get('http://localhost:4000/wordlists')).data;

    let alphabetWords = words.filter(wordList => wordList.category === 'alphabet');
    alphabetWords = alphabetWords.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
   
    const handWords = words.filter(wordList => wordList.category === 'hand');

    words = [...handWords, ...alphabetWords];

    console.log(words);

    dispatch(setWords(words));
  } catch (error) {
    dispatch(getWordsFailed(error));
  }
};

export const loadWords = () => {
  return dispatch => {
    getWords(dispatch);
  };
};
