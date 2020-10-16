import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import TypeTest from './components/TypeTest/TypeTest';
import WordsPage from './containers/WordsPage/WordsPage';
import { Switch, Route, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/type-test" component={TypeTest}/>
          <Route path="/words" component={WordsPage}/>
          <Redirect exact from="/" to="/type-test"/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
