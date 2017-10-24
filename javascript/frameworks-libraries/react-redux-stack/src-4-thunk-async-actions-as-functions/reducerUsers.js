const users = ['@a', '@b', '@c'];

function reducerUsers(state = users, action) {
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        action.newUser
      ];
    case 'CLEAR':
      return [];
    default:
      return [...state];
  }
}

export default reducerUsers;
