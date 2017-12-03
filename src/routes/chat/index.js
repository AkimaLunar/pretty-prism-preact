import { h, Component } from 'preact';
// import PropTypes from 'prop-types';
import style from './style';

export default class Chat extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <p>Chat {this.props.match.params.id}</p>;
  }
}
