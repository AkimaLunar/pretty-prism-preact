import { h } from 'preact';
import style from './style';
import Username from '../username';
import Timestamp from '../timestamp';

export function Comment(props) {
  const deleteComment = props.self ? (
    <a
      onClick={e => {
        e.preventDefault();
        props.delete(props.comment.id);
      }}
    >
      &ensp;|&nbsp;delete
    </a>
  ) : (
    ''
  );
  return (
    <p class={style.comment}>
      <Username user={props.comment.author} />&ensp;
      <Timestamp timestamp={props.comment.timestamp} />&ensp;
      {props.comment.text}
      {deleteComment}
    </p>
  );
}

export default Comment;
