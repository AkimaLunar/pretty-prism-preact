import { h, Component } from 'preact';
// import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { bind } from 'decko';
import style from './style';
import ChatBubble from '../../components/chat-bubble';
import ChatInput from '../../components/chat-input';

class Chat extends Component {
  constructor(props) {
    super(props);
  }

  @bind
  createMessage(text) {
    return this.props
      .gqlCreateMessage({
        variables: {
          receiver: this.props.match.params.id,
          text: text
        }
      })
      .then(() => {
        this.props.gqlChat.refetch();
      })
      .catch(error => {
        this.setState({ error });
      });
  }
  render({ gqlChat, user }) {
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
      <div>
        <main class={style.chat}>
          {gqlChat.chat.map(message => (
            <ChatBubble
              username={message.sender.username}
              text={message.text}
              timestamp={message.timestamp}
              self={message.sender.username === user.username}
              key={message.id}
            />
          ))}
        </main>
        <ChatInput submit={this.createMessage} />
      </div>
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

const CREATE_MESAGE_MUTATION = gql`
  mutation gqlCreateMessage($receiver: String!, $text: String!) {
    createMessage(receiver: $receiver, text: $text) {
      id
    }
  }
`;

export default compose(
  graphql(CHAT_QUERY, {
    name: 'gqlChat',
    options: ownProps => ({
      variables: {
        receiverId: ownProps.user.id,
        senderId: ownProps.match.params.id
      }
    })
  }),
  graphql(CREATE_MESAGE_MUTATION, {
    name: 'gqlCreateMessage'
  })
)(Chat);
