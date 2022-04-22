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
