import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import WordsPageStyles from './WordsPage.module.css';
import axios from 'axios';

class WordsPage extends Component {
  componentDidMount() {
    this.getWords()
  }

  getWords = async() => {
    try {
      const words = await (await axios.get('http://localhost:4000/wordlists')).data;

      console.log(words);
      this.props.onLoadWords(words);
    } catch (error) {
      console.log(error);
    }
  }

  renderTableBody = () => {
    // some code
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
              <th>Category</th>
              <th>Name</th>
              <th>Words</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    words: state.wordsPage.words
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadWords: words => dispatch(actionCreators.loadWords(words))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordsPage);
