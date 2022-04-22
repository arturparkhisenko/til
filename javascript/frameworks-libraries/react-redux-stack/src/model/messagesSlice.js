import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [
    {
      author: '@a',
      text: 'Hi :)',
      timeStamp: 1234,
    },
    {
      author: '@b',
      text: 'Hello!',
      timeStamp: 1235,
    },
  ],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // @see https://redux-toolkit.js.org/api/createSlice#customizing-generated-action-creators
    addMessage: {
      reducer: (state, action) => {
        console.log('addMessage action.payload', action.payload);
        state.value.push(action.payload);
      },
      prepare: (text, author) => {
        return {
          payload: { author, text, timeStamp: Date.now() },
        };
      },
    },
    clear: (state) => {
      state.value = [];
    },
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectMessages = (state) => state.messages.value;
export const { addMessage, clear } = messagesSlice.actions;
export default messagesSlice.reducer;

// TODO: try https://redux-toolkit.js.org/api/matching-utilities
// TODO: try https://redux-toolkit.js.org/api/createSlice#the-extrareducers-map-object-notation
