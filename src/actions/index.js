import fetchAPI from '../services/fetchCurrencies';

export function getEmail(email) {
  return {
    type: 'GET_EMAIL',
    email,
  };
}

export const fetchRequest = () => ({
  type: 'FETCH_REQUEST',
});

export const fetchSuccess = (currencies) => ({
  type: 'FETCH_SUCCESS',
  currencies,
});

export const fetchFailure = (error) => ({
  type: 'FETCH_FAILURE',
  error,
});

export const getExpense = (expense, exchangeRates) => ({
  type: 'GET_EXPENSE',
  expense: { ...expense, exchangeRates },
});

export function AllCurrencies() {
  return async (dispatch) => {
    dispatch(fetchRequest());
    try {
      const apiData = await fetchAPI();
      const currencies = Object.keys(apiData).filter((currency) => currency !== 'USDT');
      dispatch(fetchSuccess(currencies));
    } catch (error) {
      dispatch(fetchFailure(error));
    }
  };
}

export function expExchangeRates(expense) {
  return async (dispatch) => {
    dispatch(fetchRequest());
    await fetchAPI()
      .then((data) => {
        dispatch(getExpense(expense, data));
      })
      .catch((error) => {
        dispatch(fetchFailure(error.message));
      });
  };
}
