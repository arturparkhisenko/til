import React, {Component} from 'react';

class Messages extends Component {
  render() {
    console.log('Messages', this.props); // {users}
    return (
      <div className="Messages">
        <ul>
          {this.props.messages.map(message => {
            return <li key={message.timeStamp}>{`${message.author}: ${message.text}`}</li>;
          })}
        </ul>
        <hr/>

        <input type="text" placeholder="Enter a message"/>

        <button onClick={()=>this.props.addMessage({
          text: '',
          timeStamp: Date.now(),
          author: '1'
        })}>add</button>
      </div>
    );
  }
}

export default Messages;
