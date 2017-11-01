import { h, Component } from 'preact';
import PropTypes from 'prop-types';
import style from './style';

export default class C extends Component {
  constructor(props) {
    super(props);
  }
  render(props, state) {
    return <p>Hello!</p>;
  }
}

C.propTypes = {};

C.defaultProps = {};
