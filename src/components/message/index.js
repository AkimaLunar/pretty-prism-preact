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
  render({ message }) {
    // let messageClass = classNames({
    //   [style.message]: true,
    //   [style.new]: message.new
    // });
    return (
      <Link class={style.message} to="/chat/:id">
        <UserChip
          user={{
            username: message.username,
            avatar: message.avatar
          }}
        />
        &ensp;|&ensp;
        <span class="font__accent">
          {message.new ? 'New' : message.messages.length}
        </span>{' '}
        messages
      </Link>
    );
  }
}
