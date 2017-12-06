import { h, Component } from 'preact';
import style from './style';
import linkState from 'linkstate';
import { Link } from 'react-router-dom';
import { bind } from 'decko';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import UserChip from '../../components/userchip';
import Comment from '../../components/comment';

class Polish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      error: null
    };
  }
  componentWillReceiveProps(newProps) {
    if (!newProps.gqlPolishQuery.loading) {
      // this.props.setPolish(newProps.gqlPolishQuery.polish);
    }
  }
  componentWillUnmount() {
    // this.props.setPolish(null);
  }
  comment() {
    return this.props
      .gqlCreateComment({
        variables: {
          polishId: this.props.match.params.id,
          text: this.state.comment
        }
      })
      .then(() => {
        this.setState({ comment: '' });
        this.props.gqlPolishQuery.refetch();
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  @bind
  deleteComment(id) {
    return this.props
      .gqlDeleteCommentMutation({
        variables: {
          commentId: id
        }
      })
      .then(() => {
        this.props.gqlPolishQuery.refetch();
      })
      .catch(error => {
        this.setState({ error });
      });
  }
  render({ gqlPolishQuery, gqlChat, user }, state) {
    let chatButton;
    let commentForm = user ? (
      <form onSubmit={e => e.preventDefault()}>
        <textarea
          type="text"
          placeholder="Write kind comments here"
          spellcheck="true"
          class={style.polish__textarea}
          value={state.comment}
          onChange={linkState(this, 'comment')}
        />
        <button class={style.polish__button} onClick={() => this.comment()}>
          comment
        </button>
      </form>
    ) : (
      <p>
        <i class="twa twa--key" /> Log in to comment.
      </p>
    );
    if (gqlPolishQuery.loading || gqlChat.loading) {
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
    if (
      !gqlPolishQuery.polish ||
      gqlPolishQuery.error ||
      gqlChat.chatByUsername ||
      gqlChat.error
    ) {
      return (
        <div class={style.profile}>
          <main class={style.profile__main}>
            <p>Doesn&rsquo;t seem like this user exists&hellip;</p>
          </main>
        </div>
      );
    }
    if (!gqlChat.loading && gqlChat.chatByUser) {
      chatButton = (
        <Link
          class={`${style.polish__button} button button--primary`}
          to={`/messages/${gqlChat.chatByUser.id}`}
        >
          Ask to swap
        </Link>
      );
    }

    const { images, owners } = gqlPolishQuery.polish;
    // TODO: Add swipe element here
    return (
      <main class={style.polish}>
        <img src={images[0]} class={style.polish__image} />
        <footer class={style.polish__footer}>
          <section class={style.polish__info}>
            <Link to={`/profile/${owners[0].username}`}>
              <UserChip user={owners[0]} />
            </Link>
            &nbsp;|&nbsp;swapped {owners.length - 1} times
          </section>

          {chatButton}

          <section>
            <h3 class={style.polish__heading}>
              <i class="twa twa--dancers" />&nbsp;Chatroom
            </h3>
            {gqlPolishQuery.polish.comments &&
            gqlPolishQuery.polish.comments.length >= 1 ? (
              gqlPolishQuery.polish.comments.map(comment => (
                <Comment
                  comment={comment}
                  key={comment.id}
                  self={
                    user ? comment.author.username === user.username : false
                  }
                  delete={this.deleteComment}
                />
              ))
            ) : (
              <p>No comments here yet. Do you have something nice to say?</p>
            )}
            {commentForm}
          </section>
        </footer>
      </main>
    );
  }
}

const POLISH_QUERY = gql`
  query gqlPolishQuery($polishId: String!) {
    polish(id: $polishId) {
      id
      name
      images
      owners {
        id
        username
        avatar
      }
      comments {
        id
        author {
          username
        }
        text
        timestamp
      }
    }
  }
`;

const CHAT_QUERY = gql`
  query gqlChat($receiverId: String!) {
    chatByUser(receiverId: $receiverId) {
      id
    }
  }
`;

const CREATE_COMMENT_MUTATION = gql`
  mutation gqlCommentMutation($polishId: String!, $text: String!) {
    createComment(polishId: $polishId, text: $text) {
      text
      timestamp
      author {
        username
      }
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation gqlDeleteCommentMutation($commentId: ID!) {
    deleteComment(id: $commentId) {
      id
    }
  }
`;

export default compose(
  graphql(POLISH_QUERY, {
    name: 'gqlPolishQuery',
    options: ownProps => ({
      variables: {
        polishId: ownProps.match.params.id
      }
    })
  }),
  graphql(CHAT_QUERY, {
    name: 'gqlChat',
    options: ownProps => ({
      variables: {
        receiverId: ownProps.match.params.id
      }
    })
  }),
  graphql(CREATE_COMMENT_MUTATION, {
    name: 'gqlCreateComment'
  }),
  graphql(DELETE_COMMENT_MUTATION, {
    name: 'gqlDeleteCommentMutation'
  })
)(Polish);
