import { h, Component } from 'preact';
import style from './style';

import Feed from '../../components/feed';
export default class Home extends Component {
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

  render(props, state) {
    return (
      <div class={style.home}>
        <Feed />
      </div>
    );
  }
}
