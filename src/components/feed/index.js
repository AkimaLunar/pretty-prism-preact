import { h, Component } from 'preact';
// import PropTypes from 'prop-types';
import style from './style';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Item from '../item';

class Feed extends Component {
  constructor(props) {
    super(props);
  }

  render({ feedQuery }) {
    return (
      <div class={style.feed}>
        {feedQuery.loading ? (
          <p>Fetching the goodness...</p>
        ) : (
          <main class={style.grid}>
            {feedQuery.allPolishes.map(item => (
              <Item item={item} key={item.id} />
            ))}
          </main>
        )}
      </div>
    );
  }
}

const FEED_QUERY = gql`
  query feedQuery {
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

export default graphql(FEED_QUERY, { name: 'feedQuery' })(Feed);
