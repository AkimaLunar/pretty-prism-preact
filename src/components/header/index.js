import { h, Component } from 'preact';
import Link from 'react-router-dom/Link';
import classNames from 'classnames';
import style from './style';
import Avatar from '../avatar';

const LOGGED_IN_USER = {
  username: 'user.name77',
  avatar: 'http://i.pravatar.cc/34'
};
export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let extended = this.context.router.route.location.pathname === '/';
    let headerClass = classNames({
      [style.header]: true,
      [style.header__extended]: extended,
      [style.header__regular]: !extended
    });
    return (
      <header class={headerClass}>
        <Link to="/">
          <h1>PrettyPrism</h1>
        </Link>
        <p class={style.userchip}>
          <Link
            activeClassName={style.active}
            to={`/profile/${LOGGED_IN_USER.username}`}
          >
            {LOGGED_IN_USER.username}&ensp;
            <Avatar user={LOGGED_IN_USER} online={true} />{' '}
          </Link>
        </p>
        {extended ? (
          <nav>
            <Link activeClassName={style.active} to="/">
              Squad
            </Link>
            <Link activeClassName={style.active} to="/filter/nearby">
              Nearby
            </Link>
            <Link activeClassName={style.active} to="/filter/your-collection">
              Your Collection
            </Link>
          </nav>
        ) : (
          {}
        )}
      </header>
    );
  }
}
