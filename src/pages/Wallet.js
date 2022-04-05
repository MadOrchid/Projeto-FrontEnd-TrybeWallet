import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchQuote } from '../actions';
import Table from './Table';

class Wallet extends React.Component {
  componentDidMount() {
    const { fetchQuotes } = this.props;
    fetchQuotes();
  }

  expenseForm = () => {
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="expenseAmount">
          Valor:
          <input
            type="number"
            name="expenseAmount"
            id="expenseAmount"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="expenseDescription">
          Descrição:
          <input
            type="text"
            name="expenseDescription"
            id="expenseDescription"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="currencies">
          Moeda:
          <select
            name="currencies"
            id="currencies"
          >
            { currencies.map((currency) => (
              <option value={ currency } key={ currency }>
                { currency }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="paymentMethod">
          Método de pagamento:
          <select
            name="paymentMethod"
            id="paymentMethod"
            data-testid="method-input"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="expenseCategory">
          Método de pagamento:
          <select
            name="expenseCategory"
            id="expenseCategory"
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <Table />
      </form>
    );
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        { this.expenseForm() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  isLoading: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuotes: () => dispatch(fetchQuote()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchQuotes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
