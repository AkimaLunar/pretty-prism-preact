import { h } from 'preact';
import PropTypes from 'prop-types';

import CommentForm from '../comment-form';
import Comment from '../comment';

function CommentList({ user, comments, createComment, deleteComment }) {
  return (
    <section>
      {comments.length >= 1 ? (
        comments.map(comment => (
          <Comment
            comment={comment}
            key={comment.id}
            self={user ? comment.author.username === user.username : false}
            deleteComment={deleteComment}
          />
        ))
      ) : (
        <p>No comments here yet. Do you have something nice to say?</p>
      )}
      {user ? (
        <CommentForm createComment={createComment} />
      ) : (
        <p>
          <i class="twa twa--key" /> Log in to comment.
        </p>
      )}
    </section>
  );
}

CommentList.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string
  }),
  createComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired
};

export default CommentList;
