import { h, Component } from 'preact';
import style from './style';

export class Feed extends Component {
  render() {
    return (
      <div class={style.feed}>
        <main class={style.grid} />
      </div>
    );
  }
}

export default Feed;
