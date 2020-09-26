import React, { Component } from 'react';
import WordListStyles from './WordList.module.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class WordList extends Component {
  componentDidMount() {
    const wordMatrix = this.createWordRows(this.props.wordList);

    this.props.onGenerateMatrix(wordMatrix);
  }
  
  createWordRows = arr => {
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

    return wordMatrix;
  }

  renderWords = () => {
    if (this.props.matrix.length !== 0) {
      return (
        <div className={WordListStyles.WordsContainer}>
          <div className={WordListStyles.WordRowOne}>
            {this.props.matrix[this.props.wordRowIndex].map((word, index) => {
              return (
                <div 
                  className={WordListStyles.Word}
                  id={index}
                  style={this.props.index === index ? 
                    {backgroundColor: 'rgb(185, 182, 141)'} : null}>
                  <h1>{word}</h1>
                </div>
              );
            })}
          </div>
          <div className={WordListStyles.WordRowTwo}>
            {this.props.matrix[this.props.wordRowIndex + 1].map(word => {
              return (
                <div className={WordListStyles.Word}>
                  <h1>{word}</h1>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  showWord = () => {
    // return this.props.wordList[this.props.index];
    if (this.props.matrix.length !== 0) {
      return this.props.matrix[this.props.wordRowIndex].join(' ');
    }
  }

  render() {
    return (
      <div className={WordListStyles.WordList}>
        {/* <div className={WordListStyles.Word}>
          <h1 
            style={{marginBottom: '-20px'}}>{this.showWord()}
          </h1>
        </div> */}
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
