import { h, Component } from 'preact';
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router/Route';
import Switch from 'react-router/Switch';
import Home from '../routes/home';
import Header from './header';
import Profile from '../routes/profile';
import Messages from '../routes/messages';
import Polish from '../routes/polish';
import ActionButton from '../components/action-button';
// import Home from 'async!./home';
// import Profile from 'async!./profile';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div id="app">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/filter/:filter" component={Home} />
            {/* TODO: Implement loggedInUser provider */}
            <Route path="/profile/" exact component={Profile} user="me" />
            <Route path="/profile/:user" component={Profile} />
            <Route path="/polish/:id" component={Polish} />
            <Route path="/messages/" component={Messages} />
            <Route component={Home} />
          </Switch>
          <ActionButton />
        </div>
      </Router>
    );
  }
}
