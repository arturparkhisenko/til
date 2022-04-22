import React, { PureComponent } from 'react';
// Components ---------------------------
import Ul from './Ul';
import Heading5 from './Heading5';
// Styles -------------------------------
import styled from 'styled-components';

const Form = styled.form`
  padding: 0.5em;
`;

const Info = styled.span`
  opacity: 0.5;
`;

class Messages extends PureComponent {
  submitForm(event) {
    event.preventDefault();
    console.log(this.input.value);
    this.props.addMessage(this.input.value, '1');
    this.input.value = '';
  }

  render() {
    console.log('Messages props', this.props); // {users}
    return (
      <Form onSubmit={this.submitForm.bind(this)}>
        <Heading5>Messages:</Heading5>
        <Ul>
          {this.props.messages.map((message) => {
            const time = new Date(message.timeStamp);
            const hours = time.getHours();
            const minutes = time.getMinutes();
            return (
              <li key={message.timeStamp}>
                <Info>{`${hours}:${minutes} ${message.author} `}</Info>
                {message.text}
              </li>
            );
          })}
        </Ul>
        <hr />

        <input
          ref={(input) => (this.input = input)}
          type="text"
          placeholder="Enter a message"
        />
      </Form>
    );
  }
}

export default Messages;
