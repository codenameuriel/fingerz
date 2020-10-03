import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import TypeTest from './components/TypeTest/TypeTest';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={TypeTest} />
        </Switch>
      </Layout>
    )
  }
}

export default App;
