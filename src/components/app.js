// Preact
import { h, Component } from 'preact';
import { bind } from 'decko';
import AuthProvider from '../providers/AuthProvider';

// Router
import { PropsRoute, PrivateRoute } from '../providers/RoutesProvider';
import Route from 'react-router/Route';
import Router from 'react-router-dom/BrowserRouter';
import Switch from 'react-router/Switch';

// Apollo
import apolloClient from '../providers/apolloClient';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

// Components
import ActionButton from '../components/action-button';
import Chat from '../routes/chat';
import Header from './header';
import Home from '../routes/home';
import Login from '../routes/login';
import Messages from '../routes/messages';
import NewPolish from '../routes/new-polish';
import Polish from '../routes/polish';
import Profile from '../routes/profile';
import Welcome from '../routes/welcome';
// import Home from 'async!./home';
// import Profile from 'async!./profile';

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
  logout() {
    AuthProvider.deauthenticateUser();
    this.setState({ currentUser: null });
  }
  componentWillMount() {
    if (AuthProvider.isUserAuthenticated()) {
      this.setUser(AuthProvider.getUser());
    }
  }
  render(props, { currentUser, currentPolish, following }) {
    const actionButton = currentUser ? <ActionButton /> : '';
    return (
      <ApolloProvider client={apolloClient}>
        <Router>
          <div id="app">
            <Header user={currentUser} polish={currentPolish} />
            <Switch>
              <Route path="/welcome" component={Welcome} />
              <PrivateRoute
                exact
                path="/"
                component={Home}
                redirectTo="/welcome/"
              />
              <PropsRoute
                path="/filter/:filter"
                component={Home}
                redirectTo="/welcome/"
              />
              <PrivateRoute
                path="/new-polish"
                component={NewPolish}
                redirectTo="/welcome/"
              />
              <PrivateRoute
                exact
                path="/profile/"
                user={currentUser}
                component={Profile}
                self="true"
                logout={this.logout}
                redirectTo="/welcome/"
              />
              <PropsRoute
                path="/profile/:username"
                following={following}
                setFollowing={this.setFollowing}
                component={Profile}
              />
              <PropsRoute
                path="/polish/:id"
                component={Polish}
                setPolish={this.setPolish}
                user={currentUser}
              />
              <PrivateRoute
                exact
                path="/messages/"
                component={Messages}
                user={currentUser}
                redirectTo="/welcome/"
              />
              <PrivateRoute
                path="/messages/:id"
                component={Chat}
                user={currentUser}
                redirectTo="/welcome/"
              />
              <PropsRoute
                path="/login/"
                component={Login}
                setUser={this.setUser}
              />
              <Route component={Home} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
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

export default App;
