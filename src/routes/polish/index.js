import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';
import { Link } from 'react-router-dom';
import { bind } from 'decko'; // eslint-disable-line no-unused-vars

import { graphql, compose } from 'react-apollo';
import {
  POLISH_QUERY,
  CHAT_QUERY,
  CREATE_COMMENT_MUTATION,
  DELETE_COMMENT_MUTATION
} from './gql';
import UserChip from '../../components/userchip';
import CommentList from '../../components/comment-list';

class Polish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatId: null,
      error: null
    };
  }

  chat(e) {
    e.preventDefault();
    const id = this.props.gqlPolishQuery.polish.owners[0].id;
    if (!id) {
      this.setState({ error: 'No polish.' });
      return;
    }
    this.context.client
      .query({
        query: CHAT_QUERY,
        variables: { receiverId: id }
      })
      .then(response => {
        this.props.history.push(`/messages/${response.data.chatByUser.id}`);
      })
      .catch(error => this.setState({ error }));
  }

  @bind
  createComment(text) {
    return this.props
      .gqlCreateComment({
        variables: {
          polishId: this.props.match.params.id,
          text: text
        }
      })
      .then(() => {
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

  render({ gqlPolishQuery, user }) {
    if (gqlPolishQuery.loading) {
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
    if (!gqlPolishQuery.polish || gqlPolishQuery.error) {
      return (
        <div class={style.profile}>
          <main class={style.profile__main}>
            <p>Doesn&rsquo;t seem like this user exists&hellip;</p>
          </main>
        </div>
      );
    }
    const { images, owners } = gqlPolishQuery.polish;
    const isOwner = user && user.id === owners[0].id ? true : false;
    const chatButton = !isOwner ? (
      <button
        class={`${style.polish__button} button button--primary`}
        onClick={e => this.chat(e)}
      >
        Ask to swap
      </button>
    ) : (
      <p class={`font__accent ${style.polish__p}`}>
        This is your <i class="twa twa--heart" /> polish.
      </p>
    );

    // TODO: Add swipe element here
    return (
      <main class={style.polish}>
        <img src={images[0]} class={style.polish__image} />
        <footer class={style.polish__footer}>
          <section class={style.polish__info}>
            <Link to={`/profile/${owners[0].username}`}>
              <UserChip user={owners[0]} />
            </Link>{' '}
            &nbsp;|&nbsp;swapped {owners.length - 1} times
          </section>

          {chatButton}

          <h3 class={style.polish__heading}>
            <i class="twa twa--dancers" />&nbsp;Chatroom
          </h3>
          <CommentList
            user={user}
            comments={gqlPolishQuery.polish.comments}
            deleteComment={this.deleteComment}
            createComment={this.createComment}
          />
        </footer>
      </main>
    );
  }
}

Polish.propTypes = {
  gqlCreateComment: PropTypes.object,
  gqlDeleteCommentMutation: PropTypes.object,
  gqlPolishQuery: PropTypes.shape({
    refetch: PropTypes.func,
    polish: PropTypes.shape({
      owners: PropTypes.array
    })
  }),
  user: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string
  }),
  client: PropTypes.shape({
    query: PropTypes.func
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default compose(
  graphql(POLISH_QUERY, {
    name: 'gqlPolishQuery',
    options: ownProps => ({
      variables: {
        polishId: ownProps.match.params.id
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
