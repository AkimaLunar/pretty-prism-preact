import { h } from 'preact';
import style from './style';
import PropTypes from 'prop-types';

import moment from 'moment';

export function Timestamp(props) {
  const timestamp = moment(new Date(props.timestamp)).fromNow();
  return <span class={style.timestamp}>{timestamp}</span>;
}

Timestamp.propTypes = {
  user: PropTypes.shape({
    timestamp: PropTypes.string.isRequired
  })
};

export default Timestamp;
