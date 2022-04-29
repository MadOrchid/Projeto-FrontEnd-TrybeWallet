import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      totalExpense: 0, // irá armazenar localmente o valor total das despesas
    };
    this.setTotalFromProps = this.setTotalFromProps.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { totalExpenseProp, expenses } = this.props;
    if (prevProps.totalExpenseProp !== totalExpenseProp
      && totalExpenseProp !== undefined) {
      this.setTotalFromProps();
    }
    if (prevProps.expenses !== expenses) {
      this.getTotalFromExpenses();
    }
  }

  setTotalFromProps() {
    const { totalExpenseProp } = this.props;
    this.setState({ totalExpense: totalExpenseProp });
  }

  getTotalFromExpenses() {
    const { expenses } = this.props;
    // console.log(expenses, 'header');
    let convertedTotal = 0;
    expenses.forEach((expenseElem) => {
      const { currency } = expenseElem;
      const settingTotal = currency !== undefined ? convertedTotal
       += expenseElem.value * expenseElem.exchangeRates[currency].ask : null;
      return settingTotal;
    });
    this.setState({
      totalExpense: convertedTotal.toFixed(2),
    });
  }

  render() {
    const { totalExpense } = this.state;
    const { email } = this.props;
    return (
      <>
        <div>
          <h1>Teste</h1>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            Despesa total:
            {' '}
            { totalExpense }
          </p>
          <label htmlFor="currency-field">
            <p>Cambio utilizado:</p>
            <select
              id="currency-field"
              data-testid="header-currency-field"
            >
              <option>BRL</option>
            </select>
          </label>
        </div>
        <ExpenseForm />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenseProp: state.wallet.totalExpense,
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Header);
Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenseProp: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
