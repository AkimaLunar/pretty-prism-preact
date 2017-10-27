import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';
import UserChip from '../userchip';

export default class Item extends Component {
  constructor(props) {
    super(props);
  }
  render({ image, owners }) {
    return (
      <article>
        <img src={image} class={style.item} />
        <footer>
          <UserChip user={owners[0]} />
        </footer>
      </article>
    );
  }
}

Item.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  owners: PropTypes.array.isRequired
};

Item.defaultProps = {
  _id: '0000000',
  image:
    'https://github.com/AkimaLunar/pretty-prism-preact/raw/master/src/IMG_4234.JPG',
  name: 'Placeholder',
  brand: '[placeholder]',
  location: '40.712633, -73.753066',
  owners: [
    {
      _id: '847592845926',
      username: 'Ciew1987'
    },
    {
      _id: '847592845927',
      username: 'joyful.cat'
    }
  ]
};
