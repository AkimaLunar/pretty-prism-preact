import { h, Component } from 'preact';
import style from './style';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Feed from '../../components/feed';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null
    };
  }

  render({ data }) {
    if (data.loading) {
      return (
        <div class={style.home}>
          <p>
            Fetching beauty <i class="twa twa--nail-care" />
          </p>
        </div>
      );
    }
    if (data.error) {
      return (
        <div class={style.home}>
          <p>
            <i class="twa twa--scream" /> Oopsy daisies&hellip; Something went
            wrong! Try again.
          </p>
        </div>
      );
    }
    return (
      <div class={style.home}>
        <Feed polishes={data.polishes} />
      </div>
    );
  }
}

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
