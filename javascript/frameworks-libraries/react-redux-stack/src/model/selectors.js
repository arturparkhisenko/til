import { createSelector } from '@reduxjs/toolkit';

import { selectMessages } from './messagesSlice';
import { selectUsers } from './usersSlice';

export const chatSelector = createSelector(
  selectMessages, selectUsers,
  // (messages, users) => ({messages, users})
  (messages, users) => {
    console.log('selector', users, messages);
    return { users, messages };
  }
);
