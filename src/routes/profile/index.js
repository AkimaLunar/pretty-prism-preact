import { h, Component } from 'preact';
import style from './style';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import NavigationProvider from '../../providers/NavigationProvider';
import Feed from '../../components/feed';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout() {
    this.props.logout();
    this.props.history.push('/');
  }

  render({ gqlUserQuery, self }) {
    let settings = self ? (
      <button onClick={() => this.logout()}>Sign out</button>
    ) : (
      ''
    );
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
    return (
      <div class={style.profile}>
        <main class={style.profile__main}>
          {settings}
          <img
            src={gqlUserQuery.userByUsername.avatar}
            class={style.profile__avatar}
            alt={`${gqlUserQuery.userByUsername.username} profile`}
          />
          <ul class={style.profile__info}>
            <li class={style.profile__left}>
              <span class="font__accent">15</span> polishes
            </li>
            <li class={style.profile__right}>Location, ST</li>
          </ul>

          <Feed />
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

const USER_QUERY = gql`
  query gqlUserQuery($username: String!) {
    userByUsername(username: $username) {
      username
      avatar
    }
  }
`;

export default graphql(USER_QUERY, {
  name: 'gqlUserQuery',
  options: ownProps => ({
    variables: {
      username: ownProps.match.params.username || ownProps.user.username
    }
  })
})(Profile);
