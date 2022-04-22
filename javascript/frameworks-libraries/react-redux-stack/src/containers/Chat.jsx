import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Messages from './../components/Messages';
import Users from './../containers/Users';
import { chatSelector } from './../model/selectors';
import { addMessage } from './../model/messagesSlice';
import { changeUser } from './../model/actions';

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Panels = styled.div`
  display: flex;
  background-color: #f5f5f5;
  padding: 0.5em;
`;

class Chat extends Component {
  render() {
    console.log('Chat props', this.props);
    return (
      <Content>
        <h3>Chat</h3>

        <Panels>
          <Users addUser={this.props.addUser} users={this.props.users} />
          <Messages
            addMessage={this.props.addMessage}
            messages={this.props.messages}
          />
        </Panels>
      </Content>
    );
  }
}

// used a selector below
// const mapStateToProps = state => {
//   return {
//     users: state.users,
//     messages: state.messages
//   };
// };

const mapDispatchToProps = { addUser: changeUser, addMessage };

// usual
//export default connect(mapStateToProps, mapDispatchToProps)(Chat);

// with reselect
export default connect(chatSelector, mapDispatchToProps)(Chat);
