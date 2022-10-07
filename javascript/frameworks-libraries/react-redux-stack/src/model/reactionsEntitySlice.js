import {
  createEntityAdapter,
  createSlice,
  configureStore,
} from '@reduxjs/toolkit'

const reactionsAdapter = createEntityAdapter({
  // Assume IDs are stored in a field other than `book.id`
  selectId: (book) => book.bookId,
  // Keep the "all IDs" array sorted based on book titles
  sortComparer: (a, b) => a.title.localeCompare(b.title),
})

const reactionsSlice = createSlice({
  name: 'reactions',
  initialState: reactionsAdapter.getInitialState(),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    bookAdded: reactionsAdapter.addOne,
    reactionsReceived(state, action) {
      // Or, call them as "mutating" helpers in a case reducer
      reactionsAdapter.setAll(state, action.payload.reactions)
    },
  },
})

export const selectReactions = (state) => state.reactions;
export const { addUser, clear } = reactionsSlice.actions;
export default reactionsSlice.reducer;

// TODO: Try https://redux-toolkit.js.org/api/createEntityAdapter
// https://redux-toolkit.js.org/api/createEntityAdapter#crud-functions

console.log(store.getState().books)
// { ids: [], entities: {} }
// Can create a set of memoized selectors based on the location of this entity state
const booksSelectors = reactionsAdapter.getSelectors((state) => state.books)
// And then use the selectors to retrieve values
const allBooks = booksSelectors.selectAll(store.getState())
