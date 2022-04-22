import { combineReducers } from '@reduxjs/toolkit';

import messages from './messagesSlice';
import users from './usersSlice';

const rootReducer = combineReducers({
  messages,
  users,
});

export default rootReducer;
