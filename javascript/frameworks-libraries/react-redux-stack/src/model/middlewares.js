import { createListenerMiddleware } from '@reduxjs/toolkit';

import { addUser } from './usersSlice';

// const loggerMiddleware = (store) => {
const loggerMiddleware = () => {
  return function (next) {
    return function (action) {
      console.debug('trigger action:', action);
      return next(action);
      // const result = next(action);
      // console.debug('store after action', store.getState());
      // return result;
    };
  };
};

const checkUserMiddleware = (store) => (next) => (action) => {
  // Call the next dispatch method in the middleware chain.
  const returnValue = next(action);

  if (action.type === addUser.type) {
    console.log('checkUserMiddleware addUser action.payload', action.payload);
  }

  return returnValue;
};

// Create the middleware instance and methods
const listenerMiddleware = createListenerMiddleware();
// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
listenerMiddleware.startListening({
  actionCreator: addUser,
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    console.log('User added, payload: ', action.payload);
    // TODO: can we sleep there?
  },
});

export { loggerMiddleware, checkUserMiddleware, listenerMiddleware };
