import { h } from 'preact';
import PropTypes from 'prop-types';

// Router
import Router from 'react-router-dom/BrowserRouter';
import { PropsRoute, PrivateRoute } from '../providers/RoutesProvider';
import Route from 'react-router/Route';

// Components
import Chat from '../routes/chat';
import Header from '../components/header';
import Home from '../routes/home';
import Login from '../routes/login';
import Messages from '../routes/messages';
import NewPolish from '../routes/new-polish';
import Polish from '../routes/polish';
import Profile from '../routes/profile';
import Welcome from '../routes/welcome';

function Routes({ setUser, currentUser, following, follow, unfollow, logout }) {
  return (
    <Router>
      <div>
        <Header user={currentUser} />
        <Route path="/welcome" component={Welcome} />
        <PrivateRoute exact path="/" component={Home} redirectTo="/welcome/" />
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
          logout={logout}
          redirectTo="/welcome/"
        />
        <PropsRoute
          path="/profile/:username"
          following={following}
          follow={follow}
          unfollow={unfollow}
          component={Profile}
        />
        <PropsRoute path="/polish/:id" component={Polish} user={currentUser} />
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
        <PropsRoute path="/login/" component={Login} setUser={setUser} />
      </div>
    </Router>
  );
}

Routes.propTypes = {
  setUser: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }),
  following: PropTypes.array.isRequired,
  follow: PropTypes.func.isRequired,
  unfollow: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

export default Routes;
