import { h } from 'preact';
// import PropTypes from 'prop-types';
import style from './style';
// TODO: implement styling for new messages
// import classNames from 'classnames';

export function ChatBubble(props) {
  const { username, timestamp, text } = props;
  return (
    <article class={style.chatbubble}>
      <p>{username}</p>
      <p>{timestamp}</p>
      <p>{text}</p>
    </article>
  );
}

export default ChatBubble;
