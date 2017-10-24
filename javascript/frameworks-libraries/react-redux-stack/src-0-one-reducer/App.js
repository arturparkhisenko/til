import React, {Component} from 'react';
import {createStore} from 'redux'; // add combineReducers applyMiddleware
import {Provider} from 'react-redux';
// Reducers -----------------------------
import {reducer} from './reducer';
// Components ---------------------------
import Chat from './Chat';
// Styles -------------------------------
import './App.css';
// --------------------------------------

const usersInitState = ['@a', '@b', '@c'];

//{Object} store - { subscribe, dispatch, getState }
let store = createStore(reducer, {users: usersInitState});

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
