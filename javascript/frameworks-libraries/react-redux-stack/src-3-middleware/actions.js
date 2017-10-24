const addUser = () => {
  return {
    type: 'ADD_USER',
    newUser: '@' + Date.now()
  };
};

const addMessage = (text, author, timeStamp) => {
  return {
    type: 'ADD_MESSAGE',
    newMessage: {
      text,
      timeStamp,
      author
    }
  };
};

export {addUser, addMessage};
