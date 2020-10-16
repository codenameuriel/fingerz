import React, { Component } from 'react';
import WordsPageStyles from './WordsPage.module.css';

class WordsPage extends Component {
  render() {
    return (
      <div className={WordsPageStyles.WordsPage}>
        <h1>Select Words Pack</h1>
        <p>Select different collection of words to improve typing</p>
      </div>
    );
  }
}

export default WordsPage;
