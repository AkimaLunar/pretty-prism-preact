import { h, Component } from 'preact';
import style from './style';

import Item from '../../components/item';
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
      'https://raw.githubusercontent.com/AkimaLunar/pretty-prism-preact/master/src/fake-items.json'
    )
      .then(res => res.json())
      .then(feed =>
        setTimeout(() => {
          this.setState({
            feed: feed.data,
            loading: false
          });
        }, 1000)
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
            {feed.map(item => <Item {...item} key={item._id} />)}
          </main>
        )}
      </div>
    );
  }
}
