import fetchAPI from '../services/fetchCurrencies';

export function getEmail(email) {
  return {
    type: 'GET_EMAIL',
    email,
  };
}

export function getCurrencies(currencies) {
  return {
    type: 'GET_CURRENCIES',
    currencies,
  };
}

export function AllCurrencies() {
  return async (dispatch) => {
    try {
      const data = await fetchAPI();
      const filteredCurrencies = Object.keys(data)
        .filter((currency) => currency !== 'USDT');
      dispatch(getCurrencies(filteredCurrencies));
    } catch (error) {
      return error;
    }
  };
}
