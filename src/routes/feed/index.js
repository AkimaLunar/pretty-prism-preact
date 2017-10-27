import { h, Component } from 'preact';
import style from './style';

import Item from '../../components/item';
const fakeitem = {
  _id: '3052620636',
  image:
    'https://github.com/AkimaLunar/pretty-prism-preact/raw/master/src/IMG_4234.JPG',
  name: 'Purple Unicorn',
  brand: 'Nails Inc.',
  location: '40.712633, -73.753066',
  owners: [
    {
      _id: '847592845926',
      username: 'Ciew1987'
    },
    {
      _id: '847592845927',
      username: 'joyful.cat'
    }
  ]
};
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
  // render(props, { feed, loading }) {
  render(props, { loading, feed }) {
    return (
      <div class={style.feed}>
        {loading ? (
          <p>Fetching the goodness...</p>
        ) : (
          // feed.map(item => <Item item={item} key={item._id} />)
          // <Item item={feed[0]} />
          // console.log(feed[0])
          // <p>Data arrived</p>
          <main class={style.grid}>
            <h6>{this.props.filter}</h6>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </main>
        )}
      </div>
    );
  }
}
