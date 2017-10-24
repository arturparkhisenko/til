const messages = [
  {
    text: 'Hi :)',
    timeStamp: 1234,
    author: '@a'
  }, {
    text: 'Hello!',
    timeStamp: 1235,
    author: '@b'
  }
];

function reducerMessages(state = messages, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return [
        ...state,
        action.newMessage
      ];
    case 'CLEAR':
      return [];
    default:
      return [...state];
  }
}

export default reducerMessages;
