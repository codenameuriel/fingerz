import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import WordPanel from './containers/WordPanel/WordPanel';
import Keyboard from './containers/Keyboard/Keyboard';

class App extends Component {
  render() {

    return (
      <Layout>
        <WordPanel />
        <Keyboard />
      </Layout>
    )
  }
}

export default App;
