import React, { Component } from 'react';
import WordsPageStyles from './WordsPage.module.css';
import axios from 'axios';

class WordsPage extends Component {
  componentDidMount() {
   this.getWordLists();
  }

  getWordLists = async() => {
    try {
      const wordLists = await (await axios.get('http://localhost:4000/wordlists')).data;

      console.log(wordLists);
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

export default WordsPage;
