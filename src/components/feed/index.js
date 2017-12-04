import { h } from 'preact';
// import PropTypes from 'prop-types';
import style from './style';
import Item from '../item';

function Feed({ polishes }) {
  if (!polishes)
    return (
      <main class="flash">
        <p class="flash__message">
          <i class="twa twa--scream" /> Oopsy daisies&hellip; Something went
          wrong! Try again.
        </p>
      </main>
    );
  if (polishes.length < 1)
    return (
      <main class="flash">
        <p class="flash__message">
          No polishes here&hellip; <i class="twa twa--eyes" />
        </p>
      </main>
    );
  return (
    <div class={style.feed}>
      <main class={style.grid}>
        {polishes.map(item => <Item item={item} key={item.id} />)}
      </main>
    </div>
  );
}

export default Feed;
