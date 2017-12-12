import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';
import { CHAT_QUERY } from './gql';

class ChatButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  chat(e) {
    e.preventDefault();
    const id = this.props.receiverId;
    if (!id) {
      this.setState({ error: 'No receiver.' });
      return;
    }
    this.context.client
      .query({
        query: CHAT_QUERY,
        variables: { receiverId: id }
      })
      .then(response => {
        this.context.router.history.push(
          `/messages/${response.data.chatByUser.id}`
        );
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    return (
      <button
        class={`${style.chatbutton} button button--primary`}
        onClick={e => this.chat(e)}
      >
        Ask to swap
      </button>
    );
  }
}

ChatButton.propTypes = {
  receiverId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};

export default ChatButton;
