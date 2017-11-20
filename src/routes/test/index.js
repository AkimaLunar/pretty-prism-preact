import { h, Component } from 'preact';
// import PropTypes from 'prop-types';
import style from './style';

export default class Test extends Component {
  render() {
    return (
      <h1>
        Bonus: Passing Arguments Without Bind As Marc mentioned in the comments,
        it’s pretty common to use .bind to preset the arguments for a function
        call, especially in lists, like this:{' '}
      </h1>
    );
  }
}
