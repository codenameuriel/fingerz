import React from 'react';
import WordListStyles from './WordList.module.css';

const WordList = props => {
  const showWord = () => {
    return props.wordList[props.index];
  }

  return (
    <div className={WordListStyles.WordList}>
      <h1 
        style={{marginBottom: '-20px'}}>{showWord()}
      </h1>

      <h5>
        (Press <span style={{color: 'rgb(231, 231, 149)'}}>SPACE</span> for next word)
      </h5> 
    </div>
  );
}

export default WordList;
