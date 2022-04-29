import { GET_EXPENSES, SET_UPDATE_EXPENSES } from '../actions';

// state incial para o store
const INITIAL_STATE = {
  expenses: [],
  totalExpense: 0,
};

function wallet(state = INITIAL_STATE, { type, expenses, updateForExpenses }) {
  const arrExpenses = [...state.expenses, expenses];
  switch (type) {
  case GET_EXPENSES:
    return {
      ...state,
      expenses: arrExpenses,
      totalExpense: expenses !== null
        ? arrExpenses.reduce((prev, { value }) => prev
      + Number(value), 0) : 0,
    };
  case SET_UPDATE_EXPENSES:
    return {
      ...state,
      expenses: updateForExpenses,
      totalExpense: expenses !== null
        ? updateForExpenses.reduce((prev, { value }) => prev
      + Number(value), 0) : 0,
    };
  default:
    return state;
  }
}
export default wallet;
