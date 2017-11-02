import { h, Component } from 'preact';
import style from './style';

import Feed from '../../components/feed';
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null
    };
  }

  render() {
    return (
      <div class={style.home}>
        <Feed />
      </div>
    );
  }
}
