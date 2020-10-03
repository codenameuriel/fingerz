import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import TypeTest from './components/TypeTest/TypeTest';

class App extends Component {
  render() {

    return (
      <Layout>
        <TypeTest />
      </Layout>
    )
  }
}

export default App;
