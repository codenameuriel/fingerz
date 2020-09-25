import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import wordPanelReducer from './store/reducers/wordPanel';
import wordListReducer from './store/reducers/wordList';
import thunk from 'redux-thunk';

const composeEnhancers = (
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
);

const rootReducer = combineReducers({
  wordPanel: wordPanelReducer,
  wordList: wordListReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

ReactDOM.render(app,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
