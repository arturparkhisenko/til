import React, {Component} from 'react';

class Messages extends Component {
  submitForm (event) {
    event.preventDefault();
    console.log(this.input.value);
    // text, author, timeStamp
    this.props.addMessage(this.input.value, '1', Date.now());
    this.input.value = '';
  }

  render() {
    console.log('Messages', this.props); // {users}
    return (
      <form onSubmit={this.submitForm.bind(this)} className="Messages">
        <ul>
          {this.props.messages.map(message => {
            return <li key={message.timeStamp}>{`${message.author}: ${message.text}`}</li>;
          })}
        </ul>
        <hr/>

        <input ref={(input)=> this.input = input} type="text" placeholder="Enter a message"/>
      </form>
    );
  }
}

export default Messages;
