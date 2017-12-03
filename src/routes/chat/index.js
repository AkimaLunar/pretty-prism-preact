import { h, Component } from 'preact';
// import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import style from './style';
import ChatBubble from '../../components/chat-bubble';

class Chat extends Component {
  constructor(props) {
    super(props);
  }
  render({ gqlChat }) {
    if (gqlChat.loading) {
      return (
        <div class={style.profile}>
          <main class={style.profile__main}>
            <p>
              Looking <i class="twa twa--eyes" />
            </p>
          </main>
        </div>
      );
    }
    if (gqlChat.error) {
      return (
        <div class={style.profile}>
          <main class={style.profile__main}>
            <p>
              <i class="twa twa--scream" /> Oopsy daisies&hellip; Something went
              wrong! Try again.
            </p>
          </main>
        </div>
      );
    }
    return (
      <main class={style.chat}>
        Chat {this.props.match.params.id}
        {gqlChat.chat.map(message => (
          <ChatBubble
            username={message.sender.username}
            text={message.text}
            timestamp={message.timestamp}
            key={message.id}
          />
        ))}
      </main>
    );
  }
}

const CHAT_QUERY = gql`
  query gqlChat($receiverId: String!, $senderId: String!) {
    chat(receiverId: $receiverId, senderId: $senderId) {
      id
      text
      timestamp
      sender {
        username
      }
    }
  }
`;

export default graphql(CHAT_QUERY, {
  name: 'gqlChat',
  options: ownProps => ({
    variables: {
      receiverId: ownProps.user.id,
      senderId: ownProps.match.params.id
    }
  })
})(Chat);
