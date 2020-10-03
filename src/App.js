import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import TypeTest from './components/TypeTest/TypeTest';
import { Switch, Route, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/type-test" component={TypeTest}/>
          <Redirect exact from="/" to="/type-test"/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
