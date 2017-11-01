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
          <h1 class={style.navigation__logo}>PrettyPrism</h1>
        ) : (
          <Link to="/">
            <i
              class={`${style.navigation__back} twa twa--point-left `}
            />&nbsp;Back&ensp;|&ensp;
            <span class={style.navigation__title}>{this.props.data.title}</span>
          </Link>
        )}
      </li>
      <li class={style.navigation__right}>
        <Link
          to={{
            pathname: `/profile/${props.user.username}`,
            state: {
              data: props.user
            }
          }}
          class={style.navigation__username}
        >
          {props.user.username}&ensp;
          <Avatar user={props.user} online={true} />
        </Link>
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
  data: PropTypes.object
};
