import { h, Component } from 'preact';
import style from './style';

export default class UserChip extends Component {
  render() {
    return (
      <figure class={style.figure}>
        <img src="http://i.pravatar.cc/34" class={style.avatar} />
        <figcaption>user.name</figcaption>
      </figure>
    );
  }
}
