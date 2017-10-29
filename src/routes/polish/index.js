import { h, Component } from 'preact';
import style from './style';
import linkState from 'linkstate';

import UserChip from '../../components/userchip';
import Username from '../../components/username';

// TODO: Should be passed with the route
const user = {
  username: 'gary.og',
  avatar: 'http://i.pravatar.cc/34'
};
const COMMENTS = [
  {
    user: {
      _id: '329574383',
      username: 'mary.beeeee'
    },
    text: 'comment text here...',
    timestamp: 'Sat Oct 28 2017 16:10:50 GMT-0700 (Pacific Daylight Time)'
  },
  {
    user: {
      _id: '585837332',
      username: 'rihanna88'
    },
    text: 'comment text there!',
    timestamp: 'Sat Oct 28 2017 16:10:50 GMT-0700 (Pacific Daylight Time)'
  }
];
export default class Polish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }
  render(props, state) {
    let { images, owners } = props.location.state.item;
    // TODO: Add swipe element here
    return (
      <main class={style.polish}>
        <img src={images[0]} class={style.polish__image} />
        <footer class={style.polish__footer}>
          <section class={style.polish__info}>
            <UserChip user={owners[0]} />
            &nbsp;|&nbsp;swapped {owners.length - 1} times
          </section>
          <button class={`${style.polish__button} button button--primary`}>
            {' '}
            Ask to swap{' '}
          </button>
          <section>
            <h3 class={style.polish__heading}>
              <i class="twa twa--dancers" />&nbsp;Chatroom
            </h3>
            {COMMENTS.map(comment => (
              <p class={style.polish__comment}>
                <Username user={comment.user} /> {comment.text}
              </p>
            ))}
          </section>
          <textarea
            type="text"
            placeholder="Write kind comments here"
            spellcheck="true"
            class={style.polish__textarea}
            value={state.comment}
            onChange={linkState(this, 'comment')}
          />
          <button class={style.polish__button}>comment</button>
        </footer>
      </main>
    );
  }
}
