import { h } from 'preact';
import style from './style';

function NonMobile() {
  return (
    <section class={style.nonmobile}>
      <div class={style.nonmobile__container}>
        <h1 class={style.nonmobile__heading}>
          I am a mobile app! <i class="twa twa--iphone" />Try me on on a
          handheld device of your choice.
        </h1>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <circle cx="21.5" cy="32.6" r="5.1" />
          <circle cx="78.5" cy="32.6" r="5.1" />
          <path d="M72.8 52.5c-.5-2.6-3.3-4.6-6.6-4.6H34.5c-3.3 0-6.1 2-6.6 4.6h-.1v1c.1 10.5 10.2 19 22.5 19 12.4 0 22.5-8.6 22.5-19.1v-.9zm-9.5 7.6c0 5.2-5.8 9.4-13 9.4-7.1 0-12.9-4.2-12.9-9.4 0-1.3 1.6-2.4 3.5-2.4h19c1.8 0 3.4 1 3.4 2.4 0-.1 0 0 0 0z" />
        </svg>
      </div>
    </section>
  );
}

export default NonMobile;
