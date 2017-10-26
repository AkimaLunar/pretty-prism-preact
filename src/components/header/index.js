import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

import UserChip from '../userchip';
export default class Header extends Component {
  render() {
    return (
      <header class={style.header}>
        <h1>Pretty Prism</h1>

        <nav>
          <UserChip />
          <Link activeClassName={style.active} href="/">
            Home
          </Link>
          <Link activeClassName={style.active} href="/profile">
            Me
          </Link>
          <Link activeClassName={style.active} href="/profile/john">
            John
          </Link>
        </nav>
      </header>
    );
  }
}
