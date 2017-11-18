import { h, Component } from 'preact';
import Link from 'react-router-dom/Link';
import style from './style';

import Navigation from '../navigation';
import NavigationProvider from '../../providers/NavigationProvider';
import AuthProvider from '../../providers/AuthProvider';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    if (AuthProvider.isUserAuthenticated())
      this.setState(() => {
        return {
          // TODO: real callback here
          user: {
            _id: '000112233',
            username: 'user.name77',
            avatar: 'http://i.pravatar.cc/34'
          }
        };
      });
  }
  goBack() {
    this.context.router.history.goBack();
  }
  render(props, { user }) {
    const navigationData = NavigationProvider(this.context);
    return (
      <header class={style.header}>
        <nav class={style.header__nav}>
          <Navigation
            data={navigationData}
            user={user}
            goBack={() => this.goBack()}
          />
        </nav>
        {navigationData.extended ? (
          <nav class={style.header__extended}>
            <div class={style.header__float}>
              <Link activeClassName={style.active} to="/">
                Squad
              </Link>
              <Link activeClassName={style.active} to="/filter/nearby">
                Nearby
              </Link>
              <Link activeClassName={style.active} to="/filter/your-collection">
                Your Collection
              </Link>
            </div>
          </nav>
        ) : (
          ''
        )}
      </header>
    );
  }
}
