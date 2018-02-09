import { h, Component } from 'preact';
import style from './style';
import PropTypes from 'prop-types';
import { CLOUDINARY } from '../../config';

export default class UserChip extends Component {
  constructor(props) {
    super(props);
  }
  render({ user }) {
    const imgSrc = `${CLOUDINARY}/image/fetch/w_30,h_30,c_fill/${user.avatar}`;
    return (
      <figure class={style.figure}>
        {user.avatar ? (
          <img
            src={imgSrc}
            class={style.avatar}
            alt={`${user.username} profile`}
          />
        ) : (
          <div class={style.avatar}>&nbsp;</div>
        )}
        <figcaption>&ensp;{user.username}</figcaption>
      </figure>
    );
  }
}

UserChip.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
  })
};
