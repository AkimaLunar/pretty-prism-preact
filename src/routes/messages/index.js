import { h, Component } from 'preact';
// import PropTypes from 'prop-types';
import style from './style';

import Message from '../../components/message';

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: null,
      loading: true
    };
  }
  componentDidMount() {
    // TODO: API goes here
    // fetch(props.search)
    fetch(
      'https://raw.githubusercontent.com/AkimaLunar/pretty-prism-preact/master/src/fake-messages.json'
    )
      .then(res => res.json())
      .then(messages =>
        this.setState({
          messages: messages.data,
          loading: false
        })
      );

    // TODO: Error handling
    // .catch(err => console.error(err));
  }

  render(props, { loading, messages }) {
    return (
      <div class={style.messages}>
        {loading ? (
          <p>Fetching the goodness...</p>
        ) : (
          <main>
            {messages.map(message => (
              <Message message={message} key={message._id} />
            ))}
          </main>
        )}
      </div>
    );
  }
}
