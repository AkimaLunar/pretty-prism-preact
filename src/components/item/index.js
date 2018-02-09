import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';
import { CLOUDINARY } from '../../config';

import Link from 'react-router-dom/Link';
import UserChip from '../userchip';

export default class Item extends Component {
  constructor(props) {
    super(props);
  }
  render({ item }) {
    const imgSrc = `${CLOUDINARY}/image/fetch/w_200,h_200,c_fill/${
      this.props.item.images[0]
    }`;
    return (
      <Link
        to={{
          pathname: `/polish/${item.id}`,
          state: {
            data: item
          }
        }}
        class={style.item__card}
      >
        <img src={imgSrc} class={style.item__image} />
        <footer>
          <UserChip user={item.owners[0]} />
        </footer>
      </Link>
    );
  }
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    brand: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    name: PropTypes.string,
    owners: PropTypes.array
  })
};
