import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';

import Link from 'react-router-dom/Link';
import UserChip from '../userchip';
// TODO: implement styling for new messages
// import classNames from 'classnames';

class Message extends Component {
  constructor(props) {
    super(props);
  }
  render({ id, user, count }) {
    // let messageClass = classNames({
    //   [style.message]: true,
    //   [style.new]: message.new
    // });
    return (
      <Link class={style.message} to={`/messages/${id}`}>
        <UserChip user={user} />
        &ensp;|&ensp;
        <span class="font__accent">{count}</span>
        &ensp;messages
      </Link>
    );
  }
}
Message.propTypes = {
  id: PropTypes.string,
  user: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string
  }),
  count: PropTypes.number
};

export default Message;
