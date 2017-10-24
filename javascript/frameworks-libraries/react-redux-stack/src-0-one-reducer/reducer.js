function reducer(state = {users:[]}, action) {
  switch (action.type) {
    case 'ADD_NEW_USER':
      return {
        ...state,
        users: [...state.users, `@${Date.now()}`]
      };
    case 'CLEAR':
      return {users: []};
    default:
      return {...state}
  }
}

export {reducer};
