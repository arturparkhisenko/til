import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Components ---------------------------
import Messages from './../components/Messages';
import Users from './../containers/Users';
// Selectors ----------------------------
import {chatSelector} from './../selectors/selectors';
// Actions ------------------------------
import {addUser, addMessage} from './../actions/actions';
// Styles -------------------------------
import styled from 'styled-components';

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
          <Users users={this.props.users} addUser={this.props.addUser}/>
          <Messages messages={this.props.messages} addMessage={this.props.addMessage}/>
        </Panels>
      </Content>
    );
  }
}

// used a selector below
// const mapStateToProps = state => {
//   return {
//     users: state.reducerUsers,
//     messages: state.reducerMessages
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    addUser: bindActionCreators(addUser, dispatch),
    addMessage: bindActionCreators(addMessage, dispatch)
  };
};

// usual
//export default connect(mapStateToProps, mapDispatchToProps)(Chat);

// with reselect
export default connect(chatSelector, mapDispatchToProps)(Chat);
