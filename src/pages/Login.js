import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actioLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validPassword: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.validateEmail();
      this.validatePassword();
    });
  }

  validateEmail = () => {
    // Peguei essa expressão regular com o Nikolas Firmo
    const { email } = this.state;
    const regex = /\S+@\S+\.\S+/;
    this.setState({
      validEmail: regex.test(email),
    });
  }

  validatePassword = () => {
    const SIX = 6;
    const { password } = this.state;
    this.setState({
      validPassword: password.length >= SIX,
    });
  }

  loginWithUser = (event) => {
    event.preventDefault();
    const { login } = this.props;
    const { email, password } = this.state;

    login({ email, password });
  }

  render() {
    const { email, password, validEmail, validPassword } = this.state;

    return (
      <div>
        <form>
          <input
            type="email"
            name="email"
            placeholder="Digite seu email"
            value={ email }
            onChange={ this.handleChange }
            data-testid="email-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            value={ password }
            onChange={ this.handleChange }
            data-testid="password-input"
          />
          <button
            type="submit"
            disabled={ !(validEmail && validPassword) }
            onClick={ this.loginWithUser }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(actioLogin(user)),
});

export default connect(null, mapDispatchToProps)(Login);
