import { h } from 'preact';
import style from './style';
import PropTypes from 'prop-types';
import classNames from 'classnames';

let online = false;

export function Username(props) {
  let usernameClass = classNames({
    [style.username]: true,
    [style.online]: online
  });
  return <span class={usernameClass}>{props.user.username}</span>;
}

Username.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    online: PropTypes.bool
  })
};

Username.defaultProps = {
  online: false
};

export default Username;
