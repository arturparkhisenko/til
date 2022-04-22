import { nanoid } from '@reduxjs/toolkit';

import { addUser } from './usersSlice';
import { addMessage } from './messagesSlice';

export const changeUser = () => {
  return (dispatch) => {
    const name = '@' + nanoid();
    dispatch(addUser(name));
    dispatch(addMessage('Joined!', name));
  };
};
