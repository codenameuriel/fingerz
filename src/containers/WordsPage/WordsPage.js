import React, { Component } from 'react';
import WordsPageStyles from './WordsPage.module.css';

class WordsPage extends Component {
  componentDidMount() {
   // some code
  }

  
  
  render() {
    return (
      <div className={WordsPageStyles.WordsPage}>
        <h1>Select Words Pack</h1>
        <p>Select different collection of words to improve typing</p>

        <div></div>
      </div>
    );
  }
}

export default WordsPage;
