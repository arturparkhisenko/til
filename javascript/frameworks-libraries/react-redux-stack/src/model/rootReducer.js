import { combineReducers } from '@reduxjs/toolkit';

import messages from './messagesSlice';
import users from './usersSlice';
import reactions from './reactionsEntitySlice';

const rootReducer = combineReducers({
  messages,
  users,
  reactions,
});

export default rootReducer;
