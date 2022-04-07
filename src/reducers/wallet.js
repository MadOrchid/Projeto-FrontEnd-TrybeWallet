const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  if (action.type === 'FETCH_REQUEST') {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === 'FETCH_SUCCESS') {
    return {
      ...state,
      loading: false,
      currencies: action.currencies,
    };
  }
  if (action.type === 'FETCH_FAILURE') {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }
  if (action.type === 'GET_EXPENSE') {
    const expenseLength = state.expenses.length;
    const expenseObj = {
      ...action.expense,
      id: !expenseLength ? 0 : expenseLength,
    };
    return {
      ...state,
      expenses: [...state.expenses, expenseObj],
    };
  }
  return state;
}

export default wallet;
