import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AllCurrencies, expExchangeRates } from '../actions';
import { allMethods,
  INITIAL_STATE, currConv, expenseTypes, tableTitles } from './helpers';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { getExpense } = this.props;
    const { buttonText, value, description, currency, method, tag } = this.state;
    if (buttonText === 'Adicionar despesa') {
      getExpense({
        value,
        description,
        currency,
        method,
        tag,
      });
    }
    this.setState(INITIAL_STATE);
  }

  totalExpenses = () => {
    const { expenses } = this.props;
    return expenses.reduce((acc, {
      value, exchangeRates, currency,
    }) => acc + (+value * +exchangeRates[currency].ask), 0).toFixed(2);
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, description, currency, method, tag, buttonText } = this.state;
    return (
      <>
        <header>
          <p data-testid="email-field">
            {email}
          </p>
          <p data-testid="total-field">
            {this.totalExpenses()}
          </p>
          <p data-testid="header-currency-field">
            BRL
          </p>
        </header>
        <form>
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            placeholder="Valor"
            onChange={ this.handleChange }
          />
          <input
            data-testid="description-input"
            type="text"
            name="description"
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
              data-testid="currency-input"
            >
              {
                currencies.map((curr) => (
                  <option key={ curr } value={ curr }>
                    {curr}
                  </option>
                ))
              }
            </select>
          </label>
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            {
              allMethods.map((meth) => (
                <option key={ meth } value={ meth }>
                  {meth}
                </option>
              ))
            }
          </select>
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            {
              expenseTypes.map((type) => (
                <option key={ type } value={ type }>
                  {type}
                </option>
              ))
            }
          </select>
          <button type="submit" onClick={ this.handleSubmit }>
            {buttonText}
          </button>
        </form>
        <table>
          <thead>
            {tableTitles.map((label) => (
              <th name={ label } key={ label }>{label}</th>
            ))}
          </thead>
          {expenses.map((exp, index) => (
            <tbody key={ index }>
              <tr>
                <td>{exp.description}</td>
                <td>{exp.tag}</td>
                <td>{exp.method}</td>
                <td>{Number(exp.value).toFixed(2)}</td>
                <td>Real</td>
                <td>{Number(exp.exchangeRates[exp.currency].ask).toFixed(2)}</td>
                <td>{(+exp.value * +exp.exchangeRates[exp.currency].ask).toFixed(2)}</td>
                <td>{currConv[exp.currency]}</td>
                <td>
                  <button
                    type="button"
                    id={ exp.id }
                    onClick={ () => {} }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={ () => {} }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <div />
      </>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(AllCurrencies()),
  getExpense: (expense) => dispatch(expExchangeRates(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.object),
  getCurrencies: PropTypes.func,
  getExpense: PropTypes.func,
  updateExp: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
