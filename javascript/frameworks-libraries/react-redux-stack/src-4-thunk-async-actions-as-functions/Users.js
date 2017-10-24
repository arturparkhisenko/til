import React, {Component} from 'react';
// Components ---------------------------
import UserList from './UserList';

class Users extends Component {
  render() {
    console.log('Users', this.props); // {users}
    return (
      <div className="Users">
        <UserList users={this.props.users}/>
        <hr/>
        <button onClick={this.props.addUser}>add</button>
      </div>
    );
  }
}

export default Users;
