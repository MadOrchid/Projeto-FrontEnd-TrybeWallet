import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AllCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { getAllCurrencies } = this.props;
    getAllCurrencies();
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <h1 data-testid="email-field">{ email }</h1>
          <p data-testid="total-field">
            {0}
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>
      </div>
    );
  }
}
const mapStateToProps = (store) => ({
  email: store.user.email,
  currencies: store.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getAllCurrencies: () => dispatch(AllCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  getCurrencies: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
