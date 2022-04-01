import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setUsersValue } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      enable: true,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, dispatchSetValue } = this.props;
    dispatchSetValue(this.state);
    history.push('/carteira');
  }

  validateLogin = () => {
    const { email, password } = this.state;
    const minLength = 6;

    const emailValidate = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (password.length >= minLength && email.match(emailValidate)) {
      this.setState({ enable: false });
    } else {
      this.setState({ enable: true });
    }
  }

  render() {
    const { email, password, enable } = this.state;

    return (
      <form onSubmit={ this.handleSubmit }>
        <h1>{ email }</h1>
        <h1>{ password }</h1>
        <label htmlFor="email">
          <input
            type="text"
            data-testid="email-input"
            placeholder="E-mail"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            data-testid="password-input"
            placeholder="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button disabled={ enable } type="submit">Entrar</button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatchSetValue: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetValue: (email) => dispatch(setUsersValue(email)),
});

export default connect(null, mapDispatchToProps)(Login);
