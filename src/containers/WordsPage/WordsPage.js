import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import WordsPageStyles from './WordsPage.module.css';

class WordsPage extends Component {
  componentDidMount() {
    const { words, onLoadWords, onClearFilters } = this.props;

    onClearFilters();

    if (words.length === 0) {
      try {
        onLoadWords(); 
      } catch (error) {
        console.log(error);
      }
    }
  }

  renderTableBody = () => {
    const { words, filteredWords, onChecked, checkedInput } = this.props;
    let wordCollection;

    if (filteredWords.length > 0) wordCollection = filteredWords;
    else wordCollection = words;

    return (
      wordCollection.map(wordList => {
        const { words, name, category } = wordList;
        const wordsSummary = (
          `${words[0]}, ${words[1]}, ${words[2]}, ${words[3]}, ${words[4]}, ...`
         );

        return (
          <tr key={name} style={checkedInput && checkedInput === name ? {'backgroundColor' : '#523251'} : null}>
            <td>
              <input 
                onChange={event => onChecked(event, words, name)} 
                name={name}
                type="radio" 
                checked={checkedInput === name || JSON.parse(localStorage.getItem('wordsName')) === name}/>
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
      <div className={WordsPageStyles.Filter}>
        <label>Filter By: </label>
        <select onChange={event => this.props.onFilter(event.target.value)}>
          <option value="default">Default</option>
          <option value="keyboard">Keyboard</option>
          <option value="hand">Hand</option>
          <option value="alphabet">Alphabet</option>
        </select>
      </div>
    );
  }

  renderSearch = () => {
    return (
      <div className={WordsPageStyles.Search}>
        <label>Search: </label>
        <input 
          type="text"
          onChange={event => this.props.onSearch(event.target.value)}
          placeholder="Search by Name"/>
      </div>
    );
  }

  render() {
    const { checkedInput } = this.props;

    return (
      <section className={WordsPageStyles.WordsPageSection}>
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
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    words: state.wordsPage.words,
    checkedInput: state.wordsPage.checkedInput,
    filteredWords: state.wordsPage.filteredWords
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadWords: () => dispatch(actionCreators.loadWords()),
    onChecked: (event, words, name) => dispatch(actionCreators.checkedInput(event, words, name)),
    onFilter: category => dispatch(actionCreators.filterWords(category)),
    onClearFilters: () => dispatch(actionCreators.clearFilters()),
    onSearch: name => dispatch(actionCreators.searchWords(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordsPage);
