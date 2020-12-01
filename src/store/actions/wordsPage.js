import * as actionTypes from './actionTypes';
import axios from 'axios';

// access local storage
export const checkedInput = (event, words, name) => {
  return dispatch => {
    dispatch(setCheckedInput(event));
    dispatch(setWordList(words));
    localStorage.setItem('words', JSON.stringify(words));
    localStorage.setItem('wordsName', JSON.stringify(name));
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

const sortWords = words => {
  let alphabetWords = 
    words.filter(wordList => wordList.category === 'alphabet');
  
  alphabetWords = alphabetWords.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  
  const defaultWords = words.filter(wordList => wordList.category === 'default');
  const handWords = words.filter(wordList => wordList.category === 'hand');
  const keyboardWords = words.filter(wordList => wordList.category === 'keyboard');

  return [...defaultWords, ...keyboardWords, ...handWords, ...alphabetWords];
};

const getWords = async (dispatch) => {
  try {
    let words = await (await axios.get('http://localhost:4000/wordlists')).data;
    words = sortWords(words);
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

export const filterWords = category => {
  return {
    type: actionTypes.FILTER_WORDS,
    payload: { category }
  };
};

export const clearFilters = () => {
  return {
    type: actionTypes.CLEAR_FILTERS
  };
};

export const searchWords = name => {
  return {
    type: actionTypes.SEARCH_WORDS,
    payload: { name }
  };
};
