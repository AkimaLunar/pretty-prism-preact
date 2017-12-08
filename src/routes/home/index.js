import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'react-router-dom/Link';

import Feed from '../../components/feed';
import ActionButton from '../../components/action-button';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null
    };
  }

  render({ data, match, user }) {
    const { filter } = match.params;
    let message = '';
    if (filter === 'your-collection') {
      message = (
        <Link
          class={`button button--secondary ${style.home__input}`}
          to="/new-polish/"
        >
          + Upload a polish
        </Link>
      );
    }

    if (data.loading) {
      return (
        <div class="flash">
          <p class="flash__message">
            Fetching beauty <i class="twa twa--nail-care" />
          </p>
        </div>
      );
    }
    if (data.error) {
      return (
        <div class="flash">
          <p class="flash__message">
            Oopsy daisies&hellip; Something went wrong!{' '}
            <i class="twa twa--scream" /> Try again.
          </p>
        </div>
      );
    }
    return (
      <div class={style.home}>
        {message}
        <Feed polishes={data.polishes} />
        {user ? <ActionButton to="/messages/" emoji="love-letter" /> : ''}
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string
  }),
  data: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      filter: PropTypes.string
    })
  })
};

const FEED_QUERY = gql`
  query gqlFeed($filter: String) {
    polishes(filter: $filter) {
      id
      images
      name
      owners {
        username
        avatar
      }
    }
  }
`;

export default graphql(FEED_QUERY, {
  options: ownProps => ({
    variables: {
      filter: ownProps.match.params.filter
    }
  })
})(Home);
