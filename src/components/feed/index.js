import { h } from 'preact';
// import PropTypes from 'prop-types';
import style from './style';
import Item from '../item';

function Feed({ polishes }) {
  return (
    <div class={style.feed}>
      <main class={style.grid}>
        {polishes.map(item => <Item item={item} key={item.id} />)}
      </main>
    </div>
  );
}

export default Feed;
