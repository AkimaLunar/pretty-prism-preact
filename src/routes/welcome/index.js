import { h } from 'preact';
import style from './style';
import Link from 'react-router-dom/Link';

function Welcome(props) {
  return (
    <main class={style.welcome}>
      <h1 class={style.welcome__header}>Welcome</h1>
      <p>
        This is an app to swap nail polishes with your squad. Create an account
        or see what other people nearby are uploading.
      </p>
      <ul>
        <li>
          <span class={style.welcome__step}>1</span> Upload your nailpolish
          collection.
        </li>
        <li>
          <span class={style.welcome__step}>2</span> Look for nail polishes you
          like in your feed.
        </li>
        <li>
          <span class={style.welcome__step}>3</span> Ask to swap and figure out
          the logistics in chat.
        </li>
      </ul>
      <div class={style.welcome__buttongroup}>
        <Link to="/login/" class="button button--primary">
          Create an account
        </Link>
        <Link to="/filter/nearby" class="button button--secondary">
          Explore nearby
        </Link>
      </div>
    </main>
  );
}

export default Welcome;
