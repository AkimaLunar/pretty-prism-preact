import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';
import linkState from 'linkstate';

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  submit(e) {
    e.preventDefault();
    if (this.state.text.length >= 1) {
      this.props.submit(this.state.text);
      this.setState({ text: '' });
    }
  }
  render(props, { text }) {
    return (
      <form class={style.chatinput} onSubmit={e => this.submit(e)}>
        <input
          class={style.chatinput__input}
          type="text"
          onChange={linkState(this, 'text')}
          value={text}
        />
        <button class={style.chatinput__button} type="submit">
          Send
        </button>
      </form>
    );
  }
}

ChatInput.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ChatInput;
