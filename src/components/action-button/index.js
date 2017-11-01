import { h } from 'preact';
import style from './style';
// import PropTypes from 'prop-types';

import Link from 'react-router-dom/Link';

export default function ActionButton() {
  return (
    <Link class={style.actionbutton} to="/messages/">
      <i class="twa twa--love-letter" />
    </Link>
  );
}

ActionButton.propTypes = {};
