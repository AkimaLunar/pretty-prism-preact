import { h, Component } from 'preact';
import style from './style';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Feed from '../../components/feed';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null
    };
  }

  render({ gqlFeed }) {
    if (gqlFeed.loading) {
      return (
        <div class={style.home}>
          <p>
            Fetching beauty <i class="twa twa--nail-care" />
          </p>
        </div>
      );
    }
    if (gqlFeed.error) {
      return (
        <div class={style.home}>
          <p>Oopsy daisies&hellip; Something went wrong! Try again.</p>
        </div>
      );
    }
    return (
      <div class={style.home}>
        <Feed polishes={gqlFeed.allPolishes} />
      </div>
    );
  }
}

const FEED_QUERY = gql`
  query gqlFeed {
    allPolishes {
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

export default graphql(FEED_QUERY, { name: 'gqlFeed' })(Home);
