import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';
import linkState from 'linkstate';

class CommentForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    comment: ''
  };
  submit(e) {
    e.preventDefault();
    this.props.createComment(this.state.comment);
    this.setState({ comment: '' });
  }

  render(props, state) {
    return (
      <form onSubmit={e => this.submit(e)}>
        <textarea
          type="text"
          placeholder="Write kind comments here"
          spellcheck="true"
          class={style.commentform__textarea}
          value={state.comment}
          onChange={linkState(this, 'comment')}
        />
        <button class={style.commentform__button} type="submit">
          comment
        </button>
      </form>
    );
  }
}

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired
};

export default CommentForm;
