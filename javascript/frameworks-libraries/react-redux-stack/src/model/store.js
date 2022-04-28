import { configureStore } from '@reduxjs/toolkit';

import {
  checkUserMiddleware,
  loggerMiddleware,
} from './middlewares';
import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware, checkUserMiddleware),
});

// TODO: list
// TODO: Try https://redux-toolkit.js.org/api/createEntityAdapter
// TODO: Try https://redux-toolkit.js.org/api/matching-utilities
// TODO: Try https://redux-toolkit.js.org/api/createSlice#the-extrareducers-map-object-notation