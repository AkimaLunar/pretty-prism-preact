import { h, Component } from 'preact';
import style from './style';
import linkState from 'linkstate';
import { Link } from 'react-router-dom';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import UserChip from '../../components/userchip';
import Username from '../../components/username';

class Polish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      error: null
    };
  }
  componentWillMount() {
    // this.props.setPolish(this.props.gqlPolishQuery.polish);
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
        this.setState(() => {
          return { comment: '' };
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  }
  render({ gqlPolishQuery, user }, state) {
    let commentForm = user ? (
      <form>
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
    // TODO: Add swipe element here
    return (
      <main>
        <img src={images[0]} class={style.polish__image} />
        <footer class={style.polish__footer}>
          <section class={style.polish__info}>
            <Link to={`/profile/${owners[0].username}`}>
              <UserChip user={owners[0]} />
            </Link>
            &nbsp;|&nbsp;swapped {owners.length - 1} times
          </section>
          <button class={`${style.polish__button} button button--primary`}>
            {' '}
            Ask to swap{' '}
          </button>
          <section>
            <h3 class={style.polish__heading}>
              <i class="twa twa--dancers" />&nbsp;Chatroom
            </h3>
            {gqlPolishQuery.polish.comments &&
            gqlPolishQuery.polish.comments.length > 1 ? (
                gqlPolishQuery.polish.comments.map(comment => (
                  <p class={style.polish__comment} key={comment._id}>
                    <Username user={comment.author} /> {comment.text}
                  </p>
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
        username
        avatar
      }
      comments {
        author {
          username
        }
        text
        timestamp
      }
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
  })
)(Polish);
