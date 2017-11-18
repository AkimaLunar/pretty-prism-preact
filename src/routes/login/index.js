import { h, Component } from 'preact';
// import PropTypes from 'prop-types';
import style from './style';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      newUser: false
    };
  }
  render() {
    return (
      <div class={style.login}>
        <p class={style.login__heading}>Entering the exclusive squad space</p>
        <form>
          <label class={style.login__label}>username</label>
          <p class={style.login__sublabel}>
            What would be your super-sassy-hero name?
          </p>
          <input type="text" class={style.login__input} />
          <label class={style.login__label}>password</label>
          <p class={style.login__sublabel}>
            Choose a super safe secret passphrase, like VivaciousP@nd@!
          </p>
          <input type="password" class={style.login__input} />
        </form>
      </div>
    );
  }
}
