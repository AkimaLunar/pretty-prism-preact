import { h, Component } from 'preact';
import Link from 'react-router-dom/Link';
import style from './style';

import Navigation from '../navigation';
import navigationProvider from '../../providers/navigationProvider';

const LOGGED_IN_USER = {
  _id: '000112233',
  username: 'user.name77',
  avatar: 'http://i.pravatar.cc/34'
};
export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  goBack() {
    this.context.router.history.goBack();
  }
  render() {
    const currentPath = this.context.router.route.location.pathname;
    let currentData;
    this.context.router.route.location.state
      ? (currentData = this.context.router.route.location.state.data)
      : '';
    const navigationData = navigationProvider(currentPath, currentData);
    return (
      <header class={style.header}>
        <nav class={style.header__nav}>
          <Navigation
            data={navigationData}
            user={LOGGED_IN_USER}
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
