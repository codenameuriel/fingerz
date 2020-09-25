import React from 'react';
import WordListStyles from './WordList.module.css';

const WordList = props => {
  const selectNineWords = arr => {
    const selection = arr.filter((word, index) => {
      return index <= 8;
    });

    return selection;
  }

  // once the words are selected
  // need to store in state a word list that excludes the words selected

  const showWord = () => {
    // return props.wordList[props.index];
  
    return selectNineWords(props.wordList).join(' ');
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
