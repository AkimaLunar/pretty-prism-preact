// Preact
import { h, Component } from 'preact';
import { bind } from 'decko';
import AuthProvider from '../providers/AuthProvider';

// Router
import Routes from './routes';

// Apollo
import { ApolloProvider } from 'react-apollo';
import apolloClient from '../providers/apolloClient';
import gql from 'graphql-tag';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentPolish: null,
      following: []
    };
  }

  // eslint-disable-next-line
  @bind
  setPolish(polish) {
    this.setState({ currentPolish: polish });
  }

  // eslint-disable-next-line
  @bind
  setUser(user) {
    this.setState({ currentUser: user });
    this.setFollowing();
  }

  // eslint-disable-next-line
  @bind
  setFollowing() {
    const { currentUser } = this.state;
    apolloClient
      .query({
        query: FOLLOWING_QUERY,
        variables: { id: currentUser.id }
      })
      .then(response => {
        const following = response.data.userById.following.map(user => user.id);
        this.setState({ following });
      })
      .catch(error => this.setState({ error }));
  }

  @bind
  follow(id) {
    apolloClient
      .mutate({
        mutation: FOLLOW,
        variables: {
          userToFollowId: id
        }
      })
      .then(() => this.setFollowing())
      .catch(error => this.setState({ error }));
  }

  @bind
  unfollow(id) {
    apolloClient
      .mutate({
        mutation: UNFOLLOW,
        variables: {
          userToFollowId: id
        }
      })
      .then(() => this.setFollowing())
      .catch(error => this.setState({ error }));
  }

  @bind
  logout() {
    AuthProvider.deauthenticateUser();
    this.setState({ currentUser: null });
  }
  componentWillMount() {
    if (AuthProvider.isUserAuthenticated()) {
      this.setUser(AuthProvider.getUser());
    }
  }
  render(props, { currentUser, following }) {
    return (
      <div id="app">
        <ApolloProvider client={apolloClient}>
          <Routes
            setUser={this.setUser}
            currentUser={currentUser}
            following={following}
            follow={this.follow}
            unfollow={this.unfollow}
            logout={this.logout}
          />
        </ApolloProvider>
      </div>
    );
  }
}

const FOLLOWING_QUERY = gql`
  query gqlFollowingQuery($id: String!) {
    userById(id: $id) {
      following {
        id
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

export default App;
