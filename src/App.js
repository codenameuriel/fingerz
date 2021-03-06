import React, { Component } from 'react';
import AppStyles from './App.module.css';
import Layout from './hoc/Layout/Layout';
import TypePage from './components/TypePage/TypePage';
import WordsPage from './containers/WordsPage/WordsPage';
import { Switch, Route, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className={AppStyles.App}>
        <Layout>
          <Switch>
            <Route path="/type" component={TypePage}/>
            <Route path="/words" component={WordsPage}/>
            <Redirect exact from="/" to="/type"/>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
