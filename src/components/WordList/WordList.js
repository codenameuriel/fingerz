import React, { Component } from 'react';
import WordListStyles from './WordList.module.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class WordList extends Component {
  componentDidMount() {
    const { wordList, onGenerateMatrix } = this.props;
    const increasedWordList = this.addWords(this.shuffleWords(wordList));
    const wordMatrix = this.createWordMatrix(increasedWordList);

    onGenerateMatrix(wordMatrix);
  }

  shuffleWords = arr => {
    let words = [...arr];
    let shuffledWords = [];

    for (let i = words.length - 1; i >= 0; i--) {
      let randomIndex = Math.floor(Math.random() * words.length); 
      
      shuffledWords.push(words[randomIndex]);
      
      words = words.filter(word => word !== words[randomIndex]);
      }
    
      return shuffledWords;
  }

  addWords = arr => {
    let addedWords = [];

    for (let i = 0; i < 10; i++) {
      addedWords = addedWords.concat(this.shuffleWords(arr));
    }
    
    return addedWords;
  }
  
  createWordMatrix = arr => {
    const WORDS_PER_ROW = 9;
    const wordMatrix = [];
    let wordRow = [];

    for (let i = 0; i < arr.length; i++) {
      const word = arr[i];

      if (wordRow.length !== WORDS_PER_ROW) wordRow.push(word);
      if (wordRow.length === WORDS_PER_ROW || i === arr.length - 1) {
        wordMatrix.push(wordRow);
        wordRow = [];
      }
    }

    return wordMatrix;
  }

  renderWords = () => {
    const { matrix, wordRowIndex, index: propIndex, error } = this.props;
    let secondRow;

    if (matrix.length !== 0 && wordRowIndex + 1 !== matrix.length && wordRowIndex !== matrix.length) {
      secondRow = (
        <div className={WordListStyles.WordRowTwo}>
          {matrix[wordRowIndex + 1].map(word => {
            return (
              <div className={WordListStyles.Word} key={word}>
                <p>{word}</p>
              </div>
            );
          })}
        </div> 
      );
    }
    
    if (matrix.length !== 0 && wordRowIndex !== matrix.length) {
      return (
        <div className={WordListStyles.WordsContainer}>
          <div className={WordListStyles.WordRowOne}>
            {matrix[wordRowIndex].map((word, index) => {
              return (
                <div 
                  className={WordListStyles.Word}
                  key={word}
                  // 'rgb(185, 182, 141)' - alternative color
                  style={propIndex === index && !error ?
                    {backgroundColor: '#00c4c4'} : error && propIndex === index ? {backgroundColor: '#9f0000'} : null}>
                  <p>{word}</p>
                </div>
              );
            })}
          </div>
          {secondRow}
        </div>
      );
    }
  }

  render() {
    return (
      <div className={WordListStyles.WordList}>
        {this.renderWords()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wordList: state.wordPanel.wordList,
    index: state.wordPanel.index,
    matrix: state.wordPanel.matrix,
    wordRowIndex: state.wordPanel.wordRowIndex
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onGenerateMatrix: matrix => dispatch(actionCreators.generateWordMatrix(matrix))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WordList);
