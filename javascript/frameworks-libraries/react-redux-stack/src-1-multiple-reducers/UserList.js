import React, {Component} from 'react';

class UserList extends Component {
  render() {
    console.log('UserList', this.props); // {users}
    return (
      <ul className="UserList">
        {this.props.users.map(user => {
          return <li key={user}>{user}</li>;
        })}
      </ul>
    );
  }
}

export default UserList;
