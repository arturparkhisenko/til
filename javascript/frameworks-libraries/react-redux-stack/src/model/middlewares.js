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

// TODO: try async middleware
// TODO: try https://redux-toolkit.js.org/api/createAsyncThunk

export { loggerMiddleware, checkUserMiddleware };
