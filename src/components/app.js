import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Feed from '../routes/feed';
import Home from '../routes/home';
import Profile from '../routes/profile';
import Polish from '../routes/polish';
// import Home from 'async!./home';
// import Profile from 'async!./profile';

export default class App extends Component {
  /** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Header />
        <Router onChange={this.handleRoute}>
          <Feed path="/" filter="squad" />
          <Feed path="/filter/:filter" />
          <Profile path="/profile/" user="me" />
          <Profile path="/profile/:user" />
          <Polish path="/polish/:id" />
          <Feed default path="/" filter="squad" />
        </Router>
      </div>
    );
  }
}
