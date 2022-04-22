import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Chat from './containers/Chat';
// import Button from './components/Button';
// import ButtonFunctional from './components/ButtonFunctional';
import { store } from './model/store';

window.store = store;
// store.subscribe(() => console.log('subscribe', store.getState()));
// TODO: @see https://redux-toolkit.js.org/api/createListenerMiddleware

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Chat />
        {/* <Button text="Usual Button" /> */}
        {/* <ButtonFunctional  text="ButtonFunctional" /> */}
      </Provider>
    );
  }
}
