import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import WordsPageStyles from './WordsPage.module.css';

class WordsPage extends Component {
  componentDidMount() {
    if (this.props.words.length === 0) {
      try {
        this.props.onLoadWords(); 
      } catch (error) {
        console.log(error);
      }
    }
  }

  renderTableBody = () => {
    const words = this.props.words;

    return (
      words.map(wordList => {
        const wordsSummary = `${wordList.words[0]}, ${wordList.words[1]}, ${wordList.words[2]}, ${wordList.words[3]}, ${wordList.words[4]}, ...`;

        return (
          <tr key={wordList.name}>
            <td>
              <input 
                onChange={event => this.props.onChecked(event, wordList.words)} 
                name={wordList.name}
                type="radio" 
                checked={this.props.checkedInput === wordList.name}
              />
            </td>
            <td>{wordList.category}</td>
            <td>{wordList.name}</td>
            <td className={WordsPageStyles.WordsSummary}>
              <p>{wordsSummary}</p>
              <span>
                <div 
                  className={WordsPageStyles.Modal}>
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

  onClick = () => {
    this.props.history.push('/type');
  }

  render() {
    return (
      <div className={WordsPageStyles.WordsPage}>
        <h1>Select Words Pack</h1>
        <table>
          <caption>
            Select different words to practice typing
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
        <button 
          onClick={this.onClick} 
          disabled={!this.props.checkedInput}
          style={!this.props.checkedInput ? {cursor: 'not-allowed', backgroundColor: '#333'} : null}
        >Load</button>
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
    onChecked: (event, words) => dispatch(actionCreators.checkedInput(event, words))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordsPage);
