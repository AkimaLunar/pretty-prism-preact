import { h, Component } from 'preact';
import style from './style';

import { withRouter } from 'react-router';
import Navigation from '../navigation';
import NavigationExtended from '../navigation-extended';
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
        {navigationData.extended ? <NavigationExtended loggedin={user} /> : ''}
      </header>
    );
  }
}
const HeaderWithRouter = withRouter(Header);
export default HeaderWithRouter;
