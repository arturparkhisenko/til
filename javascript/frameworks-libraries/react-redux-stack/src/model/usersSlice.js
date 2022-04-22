import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: ['@a', '@b', '@c'] };

// TODO: Try Entity Adapter @see https://redux-toolkit.js.org/api/createEntityAdapter
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      console.log('addUser, name', action.payload);
      state.value.push(action.payload);
    },
    clear: (state) => {
      state.value = [];
    },
  },
});

export const selectUsers = (state) => state.users.value;
export const { addUser, clear } = usersSlice.actions;
export default usersSlice.reducer;
