import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      passwordLength: 0,
      validateButton: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateButton = this.validateButton.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateButton() {
    const { email, password } = this.state;
    const minLength = 6;

    this.setState({
      validateButton: !(email
        .match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) && password.length >= minLength),
    });
  }

  validatePassword(length) {
    const minLength = 6;

    if (length < minLength) {
      return (
        <p>Digite um email e uma senha valida </p>
      );
    }
  }

  handleChange({ target }) {
    const { passwordLength } = this.state;
    const { type, value } = target;

    this.setState({
      [type]: value,
      passwordLength: type === 'password' ? value.length : passwordLength,
    }, () => this.validateButton());
  }

  handleSubmit(e) {
    const { email } = this.state;
    const { history, getEmailValue } = this.props;
    e.preventDefault();
    getEmailValue(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, validateButton, passwordLength } = this.state;

    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          value={ email }
          onChange={ this.handleChange }
          type="email"
          placeholder="Email"
          data-testid="email-input"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          required
        />
        <input
          value={ password }
          onChange={ this.handleChange }
          type="password"
          placeholder="Senha"
          minLength={ 6 }
          data-testid="password-input"
        />
        { this.validatePassword(passwordLength) }
        <button
          type="submit"
          disabled={ validateButton }
        >
          Entrar
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmailValue: (email) => dispatch(getEmail(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
