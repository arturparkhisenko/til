import React, {Component} from 'react';
import {createStore} from 'redux'; // applyMiddleware
import {Provider} from 'react-redux';
// Reducers -----------------------------
import reducer from './reducers';
// Components ---------------------------
import Chat from './Chat';
// Styles -------------------------------
import './App.css';
// --------------------------------------

//{Object} store - { subscribe, dispatch, getState }
let store = createStore(reducer);

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
