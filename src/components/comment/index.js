import { h } from 'preact';
import PropTypes from 'prop-types';
import style from './style';
import Username from '../username';
import Timestamp from '../timestamp';

function Comment(props) {
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

Comment.propTypes = {
  self: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  })
};

export default Comment;
