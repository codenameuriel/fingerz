import React, { Component } from 'react';
import WordListStyles from './WordList.module.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class WordList extends Component {
  componentDidMount() {
    const { wordList, onGenerateMatrix } = this.props;

    const wordMatrix = this.createWordMatrix(wordList);

    onGenerateMatrix(wordMatrix);
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
    const { matrix, wordRowIndex, index: propIndex } = this.props;
    let secondRow;

    if (matrix.length !== 0 && wordRowIndex + 1 !== matrix.length && wordRowIndex !== matrix.length) {
      secondRow = (
        <div className={WordListStyles.WordRowTwo}>
          {matrix[wordRowIndex + 1].map(word => {
            return (
              <div className={WordListStyles.Word} key={word}>
                <h1>{word}</h1>
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
                  style={propIndex === index ? 
                    {backgroundColor: 'rgb(185, 182, 141)'} : null}>
                  <h1>{word}</h1>
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
        <h5>
          (press <span style={{color: 'rgb(231, 231, 149)'}}>space</span> for next word)
        </h5> 
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
