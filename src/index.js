import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import keyboardReducer from './store/reducers/keyboard';
import wordPanelReducer from './store/reducers/wordPanel';

const rootReducer = combineReducers({
  keyboard: keyboardReducer,
  wordPanel: wordPanelReducer
});

const store = createStore(rootReducer);

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
