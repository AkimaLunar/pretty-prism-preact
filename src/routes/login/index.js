import { h, Component } from 'preact';
// import PropTypes from 'prop-types';
import style from './style';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };
  }
  render() {
    return <h1>Login</h1>;
  }
}
