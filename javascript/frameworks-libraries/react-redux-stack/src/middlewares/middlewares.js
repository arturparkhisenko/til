import {addUser} from './../actions/actions';

// const loggerMiddleware = (store) => {
const loggerMiddleware = () => {
  return function(next) {
    return function(action) {
      console.debug('trigger action:', action);
      return next(action);
      // const result = next(action);
      // console.debug('store after action', store.getState());
      // return result;
    };
  };
};

const checkUserMiddleware = (store) => next => action => {
  // eslint-disable-next-line
  if (action.type === 'ADD_NEW_USER') {
    let fakeAsyncRequest = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2500);
    });

    fakeAsyncRequest.then(() => {
      store.dispatch(addUser().type);
      console.log('After checkUserMiddleware', store.getState());
    });
    return next(addUser());
  }

  return next(action);
};

export {loggerMiddleware, checkUserMiddleware};
