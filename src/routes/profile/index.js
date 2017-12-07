import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Feed from '../../components/feed';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      error: null
    };
  }
  logout() {
    this.props.logout();
    this.props.history.push('/');
  }

  follow() {
    this.props
      .gqlFollow({
        variables: {
          userToFollowId: this.props.gqlUserQuery.userByUsername.id
        }
      })
      // TODO: THIS IS REALLY SHITTY
      .then(() => window.location.reload())
      .catch(error => this.setState({ error }));
  }

  unfollow() {
    this.props
      .gqlUnfollow({
        variables: {
          userToFollowId: this.props.gqlUserQuery.userByUsername.id
        }
      })
      // TODO: THIS IS REALLY SHITTY
      .then(() => window.location.reload())
      .catch(error => this.setState({ error }));
  }

  render({ gqlUserQuery, self, following }) {
    if (gqlUserQuery.loading) {
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
    if (!gqlUserQuery.userByUsername || gqlUserQuery.error) {
      return (
        <div class={style.profile}>
          <main class={style.profile__main}>
            <p>Doesn&rsquo;t seem like this user exists&hellip;</p>
          </main>
        </div>
      );
    }
    const _following =
      following && following.indexOf(gqlUserQuery.userByUsername.id) !== -1;
    const settings = self ? (
      <button class={style.profile__button} onClick={() => this.logout()}>
        Sign out
      </button>
    ) : _following ? (
      <button
        class={`button button--danger ${style.profile__button}`}
        onClick={() => this.unfollow()}
      >
        Unfollow
      </button>
    ) : (
      <button
        class={`button button--secondary ${style.profile__button}`}
        onClick={() => this.follow()}
      >
        Follow
      </button>
    );

    return (
      <div class={style.profile}>
        <main class={style.profile__main}>
          <img
            src={gqlUserQuery.userByUsername.avatar}
            class={style.profile__avatar}
            alt={`${gqlUserQuery.userByUsername.username} profile`}
          />
          <ul class={style.profile__info}>
            <li class={style.profile__left}>
              <span class="font__accent">
                {gqlUserQuery.userByUsername.polishes.length}
              </span>{' '}
              polishes
            </li>
            <li class={style.profile__right}>Location, ST</li>
          </ul>
          {settings}

          <Feed polishes={gqlUserQuery.userByUsername.polishes} />
        </main>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          class={style.profile__circle}
        >
          <circle cx="50%" cy="0" r="54%" />
        </svg>
      </div>
    );
  }
}

Profile.propTypes = {
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  gqlUserQuery: PropTypes.shape({
    userByUsername: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  gqlFollow: PropTypes.object.isRequired,
  gqlUnfollow: PropTypes.object.isRequired
};

const USER_QUERY = gql`
  query gqlUserQuery($username: String!) {
    userByUsername(username: $username) {
      id
      username
      avatar
      polishes {
        id
        images
        name
        owners {
          username
          avatar
        }
      }
    }
  }
`;

const FOLLOW = gql`
  mutation gqlFollow($userToFollowId: String!) {
    startFollow(userToFollowId: $userToFollowId) {
      id
    }
  }
`;

const UNFOLLOW = gql`
  mutation gqlUnfollow($userToFollowId: String!) {
    stopFollow(userToFollowId: $userToFollowId) {
      id
    }
  }
`;

export default compose(
  graphql(USER_QUERY, {
    name: 'gqlUserQuery',
    options: ownProps => ({
      variables: {
        username: ownProps.match.params.username || ownProps.user.username
      }
    })
  }),
  graphql(FOLLOW, { name: 'gqlFollow' }),
  graphql(UNFOLLOW, { name: 'gqlUnfollow' })
)(Profile);
