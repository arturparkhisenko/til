import {createSelector} from 'reselect';

// usual mapStateToProps
// export const mapStateToProps = state => {
//   return {
//     users: state.reducerUsers,
//     messages: state.reducerMessages
//   };
// };

export const chatSelector = createSelector(
  state => state.reducerUsers,
  state => state.reducerMessages,
  // (users, messages) => ({users, messages})
  (users, messages) => {
    console.log('selector', users, messages);
    return {users, messages};
  }
);

export default {
  chatSelector
};
