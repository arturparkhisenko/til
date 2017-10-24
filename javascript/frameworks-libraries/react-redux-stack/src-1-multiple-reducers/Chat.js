import React, {Component} from 'react';
import {connect} from 'react-redux';
// Components ---------------------------
import Messages from './Messages';
import Users from './Users';

class Chat extends Component {
  render() {
    console.log('Chat', this.props);
    return (
      <div className="Chat">
        <h3>Chat</h3>

        <Messages messages={this.props.messages} addMessage={this.props.addMessage}/>
        <Users users={this.props.users} addUser={this.props.addUser}/>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.reducerUsers,
    messages: state.reducerMessages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addUser: (newUser) => dispatch({type: 'ADD_USER', newUser}),
    addMessage: (newMessage) => dispatch({type: 'ADD_MESSAGE', newMessage})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
