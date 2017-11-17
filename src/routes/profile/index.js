import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';

// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';

import Feed from '../../components/feed';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: API call >> setState >> get full user profile
      user: props.location.state.data
    };
  }
  render(props) {
    let { avatar, username } = props.location.state.data;
    return (
      <div class={style.profile}>
        <main class={style.profile__main}>
          <img
            src={avatar}
            class={style.profile__avatar}
            alt={`${username} profile`}
          />
          <ul class={style.profile__info}>
            <li class={style.profile__left}>
              <span class="font__accent">15</span> polishes
            </li>
            <li class={style.profile__right}>Location, ST</li>
          </ul>

          <Feed />
        </main>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          class={style.profile__circle}
        >
          <circle cx="50%" cy="0" r="54%" />
        </svg>
      </div>
    );
  }
}

Profile.propTypes = {
  location: PropTypes.object
};
