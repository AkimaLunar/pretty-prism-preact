import { h } from 'preact';
import style from './style';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CLOUDINARY } from '../../config';

// TODO: Online is a state?
export function Avatar(props) {
  let avatarClass = classNames({
    [style.avatar]: true,
    [style.online]: this.props.online
  });
  const size = this.props.size ? this.props.size : 40;
  const imgSrc = `${CLOUDINARY}/image/fetch/w_${size},h_${size},c_fill/${
    props.user.avatar
  }`;
  return <img src={imgSrc} class={avatarClass} />;
}
Avatar.defaultProps = {
  online: false
};

Avatar.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    size: PropTypes.number
  })
};

export default Avatar;
