import { h } from 'preact';
import style from './style';
import PropTypes from 'prop-types';

import Link from 'react-router-dom/Link';

function ActionButton({ to, emoji }) {
  return (
    <Link class={style.actionbutton} to={to}>
      <i class={`twa twa--${emoji}`} />
    </Link>
  );
}

ActionButton.propTypes = {
  to: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired
};

export default ActionButton;
