import React, {Component} from 'react';
import {connect} from 'react-redux';

class Chat extends Component {
  render() {
    console.log('Chat', this.props); // {dispatch, users}
    return (
      <div className="Chat">
        <h3>Chat</h3>
        <button onClick={() => this.props.dispatch({type: 'ADD_NEW_USER'})}>add next</button>
        <hr/> {this.props.users.map(user => {
          return <p key={user}>{user}</p>;
        })}
      </div>
    );
  }
}

export default connect(state => {
  return {users: state.users};
})(Chat);
