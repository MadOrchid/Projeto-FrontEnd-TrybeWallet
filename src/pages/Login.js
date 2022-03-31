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

  render() {
    const { email, password } = this.state;
    const numberPassword = 6;
    let enable = true;

    if (email.includes('@' && '.com') && password.length >= numberPassword) {
      enable = false;
    } else {
      enable = true;
    }

    return (
      <form onSubmit={ this.handleSubmit }>
        <h1>{ email }</h1>
        <h1>{ password }</h1>
        <label htmlFor="email">
          <input
            type="text"
            data-testid="email-input"
            placeholder="E-mail"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            data-testid="password-input"
            placeholder="password"
            minLength="6"
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
  dispatchSetValue: (value) => dispatch(setUsersValue(value)),
});

export default connect(null, mapDispatchToProps)(Login);
