import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reduxThunk from 'redux-thunk';
// Reducers -----------------------------
import reducer from './reducers';
// Components ---------------------------
import Chat from './Chat';
// Middleware ---------------------------
import {loggerMiddleware, checkUserMiddleware} from './middlewares';
// Styles -------------------------------
import './App.css';
// --------------------------------------

// custom example thunk
// const thunk = store => next => action =>
//   typeof action === 'function'
//     ? action(store.dispatch, store.getState)
//     : next(action);

//{Object} store - { subscribe, dispatch, getState }
let store = createStore(reducer, applyMiddleware(
  loggerMiddleware,
  checkUserMiddleware,
  reduxThunk
));

window.store = store;
// store.subscribe(() => console.log('subscribe', store.getState()));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Chat/>
        </div>
      </Provider>
    );
  }
}
