import { h, Component } from 'preact';
import style from './style';
import PropTypes from 'prop-types';

export default class UserChip extends Component {
  constructor(props) {
    super(props);
  }
  render({ user }) {
    return (
      <figure class={style.figure}>
        {user.avatar ? (
          <img
            src={user.avatar}
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
