import { h } from 'preact';
import style from './style';
import PropTypes from 'prop-types';

import moment from 'moment';

function Timestamp(props) {
  const timestamp = moment(new Date(props.timestamp)).fromNow();
  return <span class={style.timestamp}>{timestamp}</span>;
}

Timestamp.propTypes = {
  timestamp: PropTypes.number.isRequired
};

export default Timestamp;
