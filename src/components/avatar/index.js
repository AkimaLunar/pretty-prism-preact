import { h } from 'preact';
import style from './style';
import classNames from 'classnames';
import PropTypes from 'prop-types';

// TODO: Online is a state?
export function Avatar(props) {
  let avatarClass = classNames({
    [style.avatar]: true,
    [style.online]: this.props.online
  });
  return <img src={props.user.avatar} class={avatarClass} />;
}
Avatar.defaultProps = {
  online: false
};

Avatar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
  })
};

export default Avatar;
