import { h, Component } from 'preact';
import style from './style';

import SwipeContainer from '../../components/swipe';

export default class Polish extends Component {
  constructor(props) {
    super(props);
  }
  render({ id }) {
    return (
      <main>
        <img src="" />
        <p>I am polish {id}</p>
        <SwipeContainer
          class="container"
          currentPage="0"
          totalPage="4"
          soft={true}
          onChange={num => {
            console.log(num);
          }}
        >
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </SwipeContainer>
      </main>
    );
  }
}
