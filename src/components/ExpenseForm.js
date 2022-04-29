import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencyQuotes } from '../actions';
import exchangeApiFetch from '../services/exchangeApiFetch';

class ExpenseForm extends Component {
  constructor() {
    super();
    this.state = {
      allExpenses: [],
      arrCurrency: [],
      expenseAmount: '',
      method: '',
      currency: 'USD',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getArrayExpenses = this.getArrayExpenses.bind(this);
    this.getOptionsCurrency = this.getOptionsCurrency.bind(this);
  }

  componentDidMount() {
    this.getOptionsCurrency();
  }

  async getArrayExpenses() {
    const { getExpensesArray } = this.props;
    const {
      allExpenses,
      expenseAmount,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const obj = {
      id: allExpenses.length,
      value: expenseAmount,
      description,
      currency,
      method,
      tag,
      exchangeRates: {},
    };
    allExpenses.push(obj);
    this.setState({
      expenseAmount: '',
    }, () => getExpensesArray(obj));
  }

  /* cria dinamicamente os option do select do currency */
  async getOptionsCurrency() {
    const { arrCurrency } = this.state;
    const response = await exchangeApiFetch();
    Object.keys(response).forEach((item) => (item !== 'USDT'
      ? arrCurrency.push(item) : null));
    this.setState({ arrCurrency });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleClick() {
    this.getArrayExpenses();
  }

  returnInputs() {
    const { expenseAmount, arrCurrency } = this.state;
    return (
      <>
        <label htmlFor="expenseAmount">
          Valor:
          <input
            name="expenseAmount"
            id="expenseAmount"
            value={ expenseAmount }
            data-testid="value-input"
            placeholder="Valor da despesa"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            id="description"
            data-testid="description-input"
            placeholder="Descrição da despesa"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            placeholder="Moeda que será registrada a despesa"
            onChange={ this.handleChange }
          >
            {arrCurrency.map((elem) => (
              <option
                data-testid={ elem }
                key={ elem }
                value={ elem }
              >
                {elem}
              </option>
            ))}
          </select>
        </label>
      </>
    );
  }

  render() {
    return (
      <section>
        <form>
          {this.returnInputs()}
          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option>Selecione</option>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </form>
      </section>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getExpensesArray: (arrayExpenses) => dispatch(fetchCurrencyQuotes(arrayExpenses)),
});
export default connect(null, mapDispatchToProps)(ExpenseForm);
ExpenseForm.propTypes = {
  getExpensesArray: PropTypes.func.isRequired,
};
