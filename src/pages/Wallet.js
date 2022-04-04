import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { AllCurrencies } from '../actions';

const allMethods = [
  'Dinheiro',
  'Cartão de crédito',
  'Cartão de débito'];

const expenseTypes = [
  'Alimentação',
  'Lazer',
  'Trabalho',
  'Transporte',
  'Saúde'];

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  componentDidMount() {
    const { getAllCurrencies } = this.props;
    getAllCurrencies();
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  }

  render() {
    const {
      email,
      currencies } = this.props;

    const {
      currency,
      description,
      method,
      tag,
      value } = this.state;

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

        <form onSubmit={ () => {} }>
          <input
            data-testid="value-input"
            type="number"
            value={ value }
            placeholder="Valor"
            onChange={ this.handleChange }
          />
          <input
            data-testid="description-input"
            type="text"
            value={ description }
            placeholder="Descrição"
            onChange={ this.handleChange }
          />
          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((currencys) => (
                  <option
                    key={ currencys }
                    value={ currencys }
                  >
                    {currencys}
                  </option>
                ))
              }
            </select>
          </label>
          <select
            name="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            {
              allMethods.map((methodEl) => (
                <option
                  key={ methodEl }
                  value={ methodEl }
                >
                  {methodEl}
                </option>
              ))
            }
          </select>
          <select
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            {
              expenseTypes.map((expType) => (
                <option
                  key={ expType }
                  value={ expType }
                >
                  {expType}
                </option>
              ))
            }
          </select>
        </form>
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
