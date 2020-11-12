import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import WordsPageStyles from './WordsPage.module.css';

class WordsPage extends Component {
  componentDidMount() {
    const { words, onLoadWords } = this.props;

    if (words.length === 0) {
      try {
        onLoadWords(); 
      } catch (error) {
        console.log(error);
      }
    }
  }

  renderTableBody = () => {
    const { words, onChecked, checkedInput } = this.props;

    // words === wordList

    return (
      words.map(wordList => {
        const { words, name, category } = wordList;
        const wordsSummary = (
          `${words[0]}, ${words[1]}, ${words[2]}, ${words[3]}, ${words[4]}, ...`
         );

        return (
          <tr key={name}>
            <td>
              <input 
                onChange={event => onChecked(event, words)} 
                name={name}
                type="radio" 
                checked={checkedInput === name}/>
            </td>
            <td>{category}</td>
            <td>{name}</td>
            <td className={WordsPageStyles.WordsSummary}>
              <p>{wordsSummary}</p>
              <span>
                <div className={WordsPageStyles.Modal}>
                  <p>{this.formatWords(words)}</p>
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

  renderSelect = () => {
    return (
      <>
        <label>Filter By: </label>
        <select onChange={() => console.log('option changed')}>
          <option value="default">Default</option>
          <option value="hand">Hand</option>
          <option value="alphabet">Alphabet</option>
        </select>
      </>
    );
  }

  renderSearch = () => {
    return (
      <>
        <label>Search: </label>
        <input 
          type="text" 
          placeholder="Search by Name"/>
      </>
    );
  }

  render() {
    const { checkedInput } = this.props;
    return (
      <div className={WordsPageStyles.WordsPage}>
        <h1>Word Collection</h1>
        <div className={WordsPageStyles.Forms}>
          {this.renderSelect()}
          {this.renderSearch()}
        </div>
        <table>
          <caption>Select words to practice typing</caption>
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
          disabled={!checkedInput}
          style={
            !checkedInput ? {cursor: 'not-allowed', backgroundColor: '#161629'} : null
          }>Load</button>
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
