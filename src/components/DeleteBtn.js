import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { setUpdateExpenses } from '../actions';

function DeleteBtn({ id, expenses, setUpdateExpensesProp }) {
  const deleteItem = (idItem) => {
    const updateExpenses = expenses.filter((item) => item.id !== idItem);
    setUpdateExpensesProp(updateExpenses);
  };

  return (
    <button
      type="button"
      data-testid="delete-btn"
      onClick={ () => deleteItem(id) }
    >
      Excluir
    </button>
  );
}
const mapStateToProps = (state) => ({ expenses: state.wallet.expenses });
const mapDispatchToProps = (dispatch) => ({
  setUpdateExpensesProp: (update) => dispatch(setUpdateExpenses(update)) });
export default connect(mapStateToProps, mapDispatchToProps)(DeleteBtn);
DeleteBtn.propTypes = {
  id: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  setUpdateExpensesProp: PropTypes.func.isRequired,
};
