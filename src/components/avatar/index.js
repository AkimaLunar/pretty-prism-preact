import { h } from 'preact';
import style from './style';
import classNames from 'classnames';

export function Avatar(props) {
  let avatarClass = classNames({
    [`${style.avatar}`]: true,
    [`${style.online}`]: this.props.online
  });
  return <img src="http://i.pravatar.cc/34" class={avatarClass} />;
}
Avatar.defaultProps = {
  online: false
};

export default Avatar;
