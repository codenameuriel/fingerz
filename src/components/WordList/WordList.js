import React, { Component } from 'react';
import WordListStyles from './WordList.module.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class WordList extends Component {
  componentDidMount() {
    const wordMatrix = this.createWordRows(this.props.wordList);
    console.log(wordMatrix);
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
    // console.log(wordMatrix);
  }

  showWord = () => {
    // return props.wordList[props.index];
  
    // this.createWordRows(this.props.wordList);
    return this.props.wordList[this.props.index];
  }

  render() {
    return (
      <div className={WordListStyles.WordList}>
        <div className={WordListStyles.Word}>
          <h1 
            style={{marginBottom: '-20px'}}>{this.showWord()}
          </h1>
        </div>
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
    index: state.wordPanel.index
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onGenerateMatrix: matrix => dispatch(actionCreators.generateWordMatrix(matrix))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WordList);
