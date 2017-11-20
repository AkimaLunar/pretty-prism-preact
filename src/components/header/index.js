import { h, Component } from 'preact';
import Link from 'react-router-dom/Link';
import style from './style';

import { withRouter } from 'react-router';
import Navigation from '../navigation';
import NavigationProvider from '../../providers/NavigationProvider';

class Header extends Component {
  goBack() {
    this.context.router.history.goBack();
  }
  render({ location, user, polish }) {
    const navigationData = NavigationProvider.getPath(location, polish);
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
const HeaderWithRouter = withRouter(Header);
export default HeaderWithRouter;
