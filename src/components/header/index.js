import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

import Avatar from '../avatar';

export default class Header extends Component {
  render() {
    return (
      <header class={style.header}>
        <h1>PrettyPrism</h1>
        <p class={style.userchip}>
          <Link activeClassName={style.active} href="/profile/john">
            user.name&ensp;
            <Avatar online={'true'} />{' '}
          </Link>
        </p>

        <nav>
          <Link activeClassName={style.active} href="/">
            Squad
          </Link>
          <Link activeClassName={style.active} href="/filter/nearby">
            Nearby
          </Link>
          <Link activeClassName={style.active} href="/filter/your-collection">
            Your Collection
          </Link>
        </nav>
      </header>
    );
  }
}
