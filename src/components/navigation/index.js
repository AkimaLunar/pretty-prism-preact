import { h } from 'preact';
import PropTypes from 'prop-types';
import style from './style';

import Link from 'react-router-dom/Link';
import Avatar from '../avatar';

export default function Navigation(props) {
  return (
    <ul class={style.navigation}>
      <li class={style.navigation__left}>
        {this.props.data.extended ? (
          <Link to="/">
            <h1 class={style.navigation__logo}>PrettyPrism</h1>
          </Link>
        ) : props.data.back ? (
          <Link to={props.data.back}>
            <i class={`${style.navigation__back} twa twa--point-left `} />&nbsp;Back&ensp;|&ensp;
            <span class={style.navigation__title}>{this.props.data.title}</span>
          </Link>
        ) : (
          <a
            onClick={e => {
              e.preventDefault();
              props.goBack();
            }}
          >
            <i class={`${style.navigation__back} twa twa--point-left `} />&nbsp;Back&ensp;|&ensp;
            <span class={style.navigation__title}>{this.props.data.title}</span>
          </a>
        )}
      </li>
      <li class={style.navigation__right}>
        {this.props.user ? (
          <Link
            to={{
              pathname: '/profile/'
            }}
            class={style.navigation__username}
          >
            {props.user.username}&ensp;
            <Avatar user={props.user} online={true} size={40} />
          </Link>
        ) : (
          <Link to="/login/">
            &nbsp;Login&ensp;|&ensp;<i
              class={`${style.navigation__back} twa twa--key `}
            />
          </Link>
        )}
      </li>
    </ul>
  );
}

Navigation.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string
  }),
  data: PropTypes.object,
  goBack: PropTypes.func
};
