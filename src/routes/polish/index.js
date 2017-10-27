import { h, Component } from 'preact';
import style from './style';

export default class Polish extends Component {
  constructor(props) {
    super(props);
  }
  render({ id }) {
    return (
      <main>
        <img src="" />
        <p>I am polish {id}</p>
      </main>
    );
  }
}
