import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import WordsPageStyles from './WordsPage.module.css';

class WordsPage extends Component {
  componentDidMount() {
    this.props.onLoadWords();
    this.props.onRestartTest();
  }

  componentDidUpdate() {
    this.createInputRefs();
  }

  createInputRefs = () => {
    const words = this.props.words;

    return words.map(wordList => {
      return this[`${wordList.name}`] = React.createRef();
    });
  }

  renderTableBody = () => {
    const words = this.props.words;

    return (
      words.map(wordList => {
        const wordsSummary = `${wordList.words[0]}, ${wordList.words[1]}, ${wordList.words[2]}, ${wordList.words[3]}, ${wordList.words[4]}, ...`;

        return (
          <tr>
            <td>
              <input 
                onClick={() => this.props.onChecked(this[`${wordList.name}`], wordList.words)} 
                name={wordList.name}
                ref={this[`${wordList.name}`]}
                type="radio" 
                checked={this.props.checkedInput === this[`${wordList.name}`]}
              />
            </td>
            <td>{wordList.category}</td>
            <td>{wordList.name}</td>
            <td className={WordsPageStyles.WordsSummary}>
              <p>{wordsSummary}</p>
              <span>
                <div 
                  className={WordsPageStyles.Modal}
                  style={{borderRadius: '5px'}}>
                  <p>{this.formatWords(wordList.words)}</p>
                </div>
              </span>
            </td>
          </tr>
        );
      })
    );
  }

  formatWords = words => {
    let wordString = '';
    for (let i = 0; i < words.length; i++) {
      if (i !== words.length - 1) wordString += words[i] + ', '
      else wordString += words[i];
    }

    return wordString;
  }

  render() {
    return (
      <div className={WordsPageStyles.WordsPage}>
        <h1>Select Words Pack</h1>
        <table>
          <caption>
            Select different collection of words to improve typing
          </caption>
          <thead>
            <tr>
              <th>Select</th>
              <th>Category</th>
              <th>Name</th>
              <th>Words</th>
            </tr>
          </thead>
          <tbody>{this.renderTableBody()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    words: state.wordsPage.words,
    checkedInput: state.wordsPage.checkedInput
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadWords: () => dispatch(actionCreators.loadWords()),
    onChecked: (input, words) => dispatch(actionCreators.checkedInput(input, words)),
    onRestartTest: () => dispatch(actionCreators.restartTest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordsPage);
