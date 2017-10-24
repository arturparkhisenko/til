import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Components ---------------------------
import Messages from './Messages';
import Users from './Users';
// Actions ------------------------------
import {addUser, addMessage} from './actions';

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
    addUser: bindActionCreators(addUser, dispatch),
    addMessage: bindActionCreators(addMessage, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
