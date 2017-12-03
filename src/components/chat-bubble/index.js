import { h } from 'preact';
import style from './style';
// TODO: implement styling for new messages
import classNames from 'classnames';

import Username from '../username';
import Timestamp from '../timestamp';

export function ChatBubble(props) {
  const { username, timestamp, text, self } = props;
  const user = { username };
  const articleClass = classNames({
    [style.chatbubble__self]: self,
    [style.chatbubble]: true
  });
  const bubbleClass = classNames({
    [style.chatbubble__bubble]: true,
    [style.chatbubble__bubble__right]: self,
    [style.chatbubble__bubble__left]: !self
  });
  const header = self ? (
    <div>
      <Timestamp timestamp={timestamp} />&ensp;
      <span class={style.chatbubble__user}>You</span>
    </div>
  ) : (
    <div>
      <Username user={user} />&ensp;
      <Timestamp timestamp={timestamp} />
    </div>
  );

  return (
    <article class={articleClass}>
      {header}
      <p class={bubbleClass}>{text}</p>
    </article>
  );
}

export default ChatBubble;
