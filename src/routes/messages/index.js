import { h, Component } from 'preact';
// import PropTypes from 'prop-types';
import style from './style';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Message from '../../components/message';

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render({ gqlMessages, user }) {
    if (gqlMessages.loading) {
      return (
        <main class={style.messages}>
          <p>
            Looking <i class="twa twa--eyes" />
          </p>
        </main>
      );
    }
    if (gqlMessages.error) {
      return (
        <main class={style.messages}>
          <p>
            <i class="twa twa--scream" /> Oopsy daisies&hellip; Something went
            wrong! Try again.
          </p>
        </main>
      );
    }

    if (gqlMessages.messages.length < 1) {
      return (
        <main class={style.messages}>
          <p>
            Sorry, {user.username}, it doesn&rsquo;t look like you have any
            messages yet. Ask someone to swap a polish with them to start
            chatting.
          </p>
        </main>
      );
    }
    if (!gqlMessages.messages.length > 1) {
      return (
        <main class={style.profile__main}>
          <p>
            No messages here yet. Ask someone to swap a polish with them to
            start chatting.
          </p>
        </main>
      );
    }
    return (
      <main class={style.messages}>
        {gqlMessages.messages.map(chat => (
          <Message
            user={chat.user}
            count={chat.count}
            id={chat.id}
            key={chat.id}
          />
        ))}
      </main>
    );
  }
}

const MESSAGES_QUERY = gql`
  query gqlMessages($receiverId: String!) {
    messages(receiverId: $receiverId) {
      id
      user {
        username
        avatar
      }
      count
    }
  }
`;

export default graphql(MESSAGES_QUERY, {
  name: 'gqlMessages',
  options: ownProps => ({
    variables: {
      receiverId: ownProps.user.id
    }
  })
})(Messages);
