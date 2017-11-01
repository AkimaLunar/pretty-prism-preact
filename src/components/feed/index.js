import { h, Component } from 'preact';
import style from './style';

import Item from '../item';
export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: null,
      loading: true
    };
  }
  componentDidMount() {
    // fetch(props.search)
    fetch(
      'https://raw.githubusercontent.com/AkimaLunar/pretty-prism-preact/70d066a16cd4fabd06c3e79d06ab5b9c8f1273e2/src/fake-items.json'
    )
      .then(res => res.json())
      .then(feed =>
        this.setState({
          feed: feed.data,
          loading: false
        })
      )
      .catch(err => console.error(err));
  }

  render(props, { loading, feed }) {
    return (
      <div class={style.feed}>
        {loading ? (
          <p>Fetching the goodness...</p>
        ) : (
          <main class={style.grid}>
            {feed.map(item => <Item item={item} key={item._id} />)}
          </main>
        )}
      </div>
    );
  }
}
