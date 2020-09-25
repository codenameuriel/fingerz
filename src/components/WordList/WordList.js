import React from 'react';
import WordListStyles from './WordList.module.css';

const WordList = props => {
  const createWordRows = arr => {
    const WORDSPERROW = 3;
    const wordMatrix = [];
    let wordRow = [];

    for (let word of arr) {
      if (wordRow.length !== WORDSPERROW) wordRow.push(word);
      if (wordRow.length === WORDSPERROW) {
        wordMatrix.push(wordRow);
        wordRow = [];
      }
    }

    console.log(wordMatrix);
  }

  // once the words are selected
  // need to store in state a word list that excludes the words selected

  // thinking that WordList should be a class component to connect to Redux store to store/dispatch newly updated word list
  // also to retrieve that updated word list to continue rendering after the last word of the previously selected words is typed

  const showWord = () => {
    // return props.wordList[props.index];
  
    createWordRows(props.wordList);
    return props.wordList[props.index];
  }

  return (
    <div className={WordListStyles.WordList}>
      <div className={WordListStyles.Word}>
        <h1 
          style={{marginBottom: '-20px'}}>{showWord()}
        </h1>
      </div>
      <h5>
        (press <span style={{color: 'rgb(231, 231, 149)'}}>space</span> for next word)
      </h5> 
    </div>
  );
}

export default WordList;
