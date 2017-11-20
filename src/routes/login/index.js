import { h, Component } from 'preact';
// import PropTypes from 'prop-types';
import style from './style';
import linkState from 'linkstate';
import AuthProvider from '../../providers/AuthProvider';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      newUser: false,
      error: null
    };
  }
  submit() {
    const { username, password } = this.state;
    let method = this.state.newUser
      ? this.props.gqlCreateUser
      : this.props.gqlLogin;
    return method({
      variables: {
        username,
        password
      }
    })
      .then(({ data }) => {
        let _data = this.state.newUser ? data.createUser : data.login;
        AuthProvider.authenticateUser(_data);
        return _data;
      })
      .then(data => {
        this.props.setUser(data);
      })
      .then(() => this.props.history.push('/'))
      .catch(error => {
        this.setState({ error });
      });
  }

  render(props, { error }) {
    return (
      <div class={style.login}>
        <h4 class={style.login__heading}>
          {this.state.newUser ? 'Sign Up' : 'Login'}
        </h4>
        {error ? error.message : ''}
        <form onSubmit={e => e.preventDefault()}>
          <label class={style.login__label}>username</label>
          <p class={style.login__sublabel}>
            What is your super-sassy-hero name?
          </p>
          <input
            type="text"
            class={style.login__input}
            onChange={linkState(this, 'username')}
          />
          <label class={style.login__label}>password</label>
          <p class={style.login__sublabel}>
            Choose a super safe secret passphrase, like VivaciousP@nd@!
          </p>
          <input
            type="password"
            class={style.login__input}
            onChange={linkState(this, 'password')}
          />
          <button
            onClick={() => this.setState({ newUser: !this.state.newUser })}
          >
            {this.state.newUser ? 'Already a member?' : 'Need a new account?'}
          </button>
          <button class="button button--primary" onClick={() => this.submit()}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const CREATE_USER_MUTATION = gql`
  mutation gqlCreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      token
      id
      username
      avatar
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation gqlLogin($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      id
      username
      avatar
    }
  }
`;

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'gqlCreateUser' }),
  graphql(LOGIN_MUTATION, { name: 'gqlLogin' })
)(Login);
