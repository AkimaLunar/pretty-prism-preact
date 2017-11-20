// Preact
import { h, Component } from 'preact';
import { bind } from 'decko';
import AuthProvider from '../providers/AuthProvider';

// Router
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router/Route';
import Switch from 'react-router/Switch';
import { PropsRoute, PrivateRoute } from '../providers/RoutesProvider';

// Apollo
import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
const httpLink = createHttpLink({
  uri: 'http://api.prettyprism.com/graphql'
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// Components
import ActionButton from '../components/action-button';
import Header from './header';
import Home from '../routes/home';
import Login from '../routes/login';
import Messages from '../routes/messages';
import Polish from '../routes/polish';
import Profile from '../routes/profile';
// import Home from 'async!./home';
// import Profile from 'async!./profile';
import Test from '../routes/test';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      currentPolish: null
    };
  }
  @bind
  setPolish(polish) {
    this.setState({ currentPolish: polish });
  }
  @bind
  setUser(user) {
    this.setState({ currentUser: user });
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
  render(props, { currentUser, currentPolish }) {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div id="app">
            <Header user={currentUser} polish={currentPolish} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/filter/:filter" component={Home} />
              <PrivateRoute
                exact
                path="/profile/"
                user={currentUser}
                component={Profile}
                self="true"
                logout={this.logout}
              />
              <PropsRoute path="/profile/:username" component={Profile} />
              <PropsRoute
                path="/polish/:id"
                component={Polish}
                setPolish={this.setPolish}
              />
              <Route path="/messages/" component={Messages} />
              <PropsRoute
                path="/login/"
                component={Login}
                setUser={this.setUser}
              />
              <PrivateRoute path="/test/" redirectTo="/" component={Test} />
              <Route component={Home} />
            </Switch>
            <ActionButton />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}
