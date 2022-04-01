import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUsersValue } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
      email: '',
      password: '',
    };
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.loginValidation);
  }

  loginValidation = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+/i;

    if (emailRegex.test(email) && password.length >= minLength) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  handleLogin = () => {
    const { history, sendLogin } = this.props;
    const { email } = this.state;
    sendLogin(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <section>
        <input
          data-testid="email-input"
          type="text"
          name="email"
          onChange={ this.handleInput }
          value={ email }
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          onChange={ this.handleInput }
          value={ password }
        />
        <button
          disabled={ isDisabled }
          type="button"
          onClick={ this.handleLogin }
        >
          Entrar
        </button>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  sendLogin: (state) => dispatch(setUsersValue(state)),
});

export default connect(null, mapDispatchToProps)(Login);
