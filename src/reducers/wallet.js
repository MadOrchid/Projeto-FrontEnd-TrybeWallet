const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  if (action.type === 'GET_CURRENCIES') {
    return {
      ...state,
      currencies: action.currencies,
    };
  }
  return state;
};
export default wallet;
