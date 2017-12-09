import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { bind } from 'decko'; // eslint-disable-line no-unused-vars
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
          chatId: this.props.match.params.id,
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
          {gqlChat.chatById.messages.map(message => (
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

Chat.propTypes = {
  gqlCreateMessage: PropTypes.object,
  gqlChat: PropTypes.shape({
    refetch: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};

const CHAT_QUERY = gql`
  query gqlChat($id: String!) {
    chatById(id: $id) {
      messages {
        sender {
          username
        }
        text
        timestamp
      }
    }
  }
`;

const CREATE_MESAGE_MUTATION = gql`
  mutation gqlCreateMessage($chatId: String!, $text: String!) {
    createMessage(chatId: $chatId, text: $text) {
      id
    }
  }
`;

export default compose(
  graphql(CHAT_QUERY, {
    name: 'gqlChat',
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.id
      }
    })
  }),
  graphql(CREATE_MESAGE_MUTATION, {
    name: 'gqlCreateMessage'
  })
)(Chat);
