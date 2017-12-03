import { h, Component } from 'preact';
// import PropTypes from 'prop-types';
import style from './style';

import Link from 'react-router-dom/Link';
import UserChip from '../userchip';
// TODO: implement styling for new messages
// import classNames from 'classnames';

export default class Message extends Component {
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
        <UserChip
          user={{
            username: user.username,
            avatar: user.avatar
          }}
        />
        &ensp;|&ensp;
        <span class="font__accent">{count}</span>
        &ensp;messages
      </Link>
    );
  }
}
