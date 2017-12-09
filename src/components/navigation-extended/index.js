import { h } from 'preact';
import PropTypes from 'prop-types';
import style from './style';

import Link from 'react-router-dom/Link';

function NavigationExtended({ loggedin }) {
  if (loggedin) {
    return (
      <nav class={style.navigationextended}>
        <div class={style.navigationextended__float}>
          <Link activeClassName={style.active} to="/">
            Squad
          </Link>
          <Link activeClassName={style.active} to="/filter/nearby">
            Nearby
          </Link>
          <Link activeClassName={style.active} to="/filter/your-collection">
            Your Collection
          </Link>
        </div>
      </nav>
    );
  } else {
    return (
      <nav class={style.navigationextended}>
        <div class={style.navigationextended__float}>
          <Link activeClassName={style.active} to="/welcome">
            Welcome
          </Link>
          <Link activeClassName={style.active} to="/filter/nearby">
            Nearby
          </Link>
        </div>
      </nav>
    );
  }
}

NavigationExtended.propTypes = {
  loggedin: PropTypes.bool
};

export default NavigationExtended;
