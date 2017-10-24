export const addUser = () => {
  return dispatch => {
    const name = '@' + Date.now();
    dispatch({type: 'ADD_USER', newUser: name});
    dispatch(addMessage('Joined to a channel', name, Date.now()));
  };
};

export const addMessage = (text, author, timeStamp) => {
  return {
    type: 'ADD_MESSAGE',
    newMessage: {
      text,
      timeStamp,
      author
    }
  };
};
