import React, {Component} from 'react';
// Components ---------------------------
import Ul from './Ul';
// Styles -------------------------------
import styled from 'styled-components';

const Li = styled.li`
  width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UlStyled = styled(Ul)`
  font-family: monospace;
`;

class UserList extends Component {
  render() {
    console.log('UserList props', this.props); // {users}
    return (
      <Ul className="UserList">
        <UlStyled className="UserList">
          {this.props.users.map(user => {
            return <Li key={user}>{user}</Li>;
          })}
        </UlStyled>
      </Ul>
    );
  }
}

export default UserList;
