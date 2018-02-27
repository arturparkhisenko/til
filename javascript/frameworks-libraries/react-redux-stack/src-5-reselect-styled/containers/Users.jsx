import React, {Component} from 'react';
// Components ---------------------------
import UserList from './../components/UserList';
import Heading5 from './../components/Heading5';
// Styles -------------------------------
import styled from 'styled-components';

// import { createSelector } from 'reselect';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  background-color: #cccdff;
`;

class Users extends Component {
  render() {
    console.log('Users props', this.props); // {users}
    return (
      <Content>
        <Heading5>Users:</Heading5>
        <button onClick={this.props.addUser}>add</button>
        <UserList users={this.props.users}/>
      </Content>
    );
  }
}

export default Users;
