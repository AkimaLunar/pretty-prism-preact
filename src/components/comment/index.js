import { h } from 'preact';
import PropTypes from 'prop-types';
import style from './style';
import Username from '../username';
import Timestamp from '../timestamp';

function Comment({ comment, self }) {
  const deleteComment = self ? (
    <a
      onClick={e => {
        e.preventDefault();
        this.props.deleteComment(comment.id);
      }}
    >
      &ensp;|&nbsp;delete
    </a>
  ) : (
    ''
  );
  return (
    <p class={style.comment}>
      <Username user={comment.author} />&ensp;
      <Timestamp timestamp={comment.timestamp} />&ensp;
      {comment.text}
      {deleteComment}
    </p>
  );
}

Comment.propTypes = {
  self: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  })
};

export default Comment;
