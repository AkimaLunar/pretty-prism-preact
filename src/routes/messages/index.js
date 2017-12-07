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

  render({ gqlUser, user }) {
    const setSender = (users, id) => {
      if (users.indexOf(id) === 0) {
        return users[1];
      } else {
        return users[0];
      }
    };

    if (gqlUser.loading) {
      return (
        <main class="flash">
          <p class="flash__message">
            Looking <i class="twa twa--eyes" />
          </p>
        </main>
      );
    }
    if (gqlUser.error) {
      return (
        <main class="flash">
          <p class="flash__message">
            <i class="twa twa--scream" /> Oopsy daisies&hellip; Something went
            wrong! Try again.
          </p>
        </main>
      );
    }

    if (gqlUser.userById.chats.length < 1) {
      return (
        <main class="flash">
          <p class="flash__message">
            Sorry, {user.username}, it doesn&rsquo;t look like you have any
            messages yet. Ask someone to swap a polish with them to start
            chatting.
          </p>
        </main>
      );
    }
    return (
      <main class={style.messages}>
        {gqlUser.userById.chats.map(chat => (
          <Message
            user={setSender(chat.users, user.id)}
            count={chat.messages.length}
            id={chat.id}
            key={chat.id}
          />
        ))}
      </main>
    );
  }
}

const USER_QUERY = gql`
  query gqlUser($id: String!) {
    userById(id: $id) {
      id
      chats {
        id
        messages {
          text
        }
        users {
          username
          avatar
        }
      }
    }
  }
`;

export default graphql(USER_QUERY, {
  name: 'gqlUser',
  options: ownProps => ({
    variables: {
      id: ownProps.user.id
    }
  })
})(Messages);
