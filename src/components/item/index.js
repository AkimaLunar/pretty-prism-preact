import { h, Component } from 'preact';
import style from './style';

export default class Item extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <figure class={style.figure}>
        <img src="http://i.pravatar.cc/34" class={style.avatar} />
        <figcaption />
      </figure>
    );
  }
}
