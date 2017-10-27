import { h, Component } from 'preact';
import style from './style';
import PropTypes from 'prop-types';

export default class UserChip extends Component {
  constructor(props) {
    super(props);
  }
  render(props) {
    return (
      <figure class={style.figure}>
        <img src="http://i.pravatar.cc/34" class={style.avatar} />
        <figcaption>&ensp;{props.user.username}</figcaption>
      </figure>
    );
  }
}

UserChip.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string
};
