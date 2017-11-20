import { h, Component } from 'preact';
import style from './style';
import linkState from 'linkstate';
import { Link } from 'react-router-dom';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import UserChip from '../../components/userchip';
import Username from '../../components/username';

class Polish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }
  componentWillMount() {
    // this.props.setPolish(this.props.gqlPolishQuery.polish);
  }
  componentWillUnmount() {
    // this.props.setPolish(null);
  }
  render({ gqlPolishQuery, location }, state) {
    let { images, owners } = location.state.data;

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
          </section>
          <textarea
            type="text"
            placeholder="Write kind comments here"
            spellcheck="true"
            class={style.polish__textarea}
            value={state.comment}
            onChange={linkState(this, 'comment')}
          />
          <button class={style.polish__button}>comment</button>
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
const COMMENTS_QUERY = gql`
  query gqlCommentsQuery($polishId: String!) {
    comments(polishId: $polishId) {
      author {
        username
      }
      text
      timestamp
    }
  }
`;

export default graphql(POLISH_QUERY, {
  name: 'gqlPolishQuery',
  options: ownProps => ({
    variables: {
      polishId: ownProps.location.state.data.id
    }
  })
})(Polish);
