export const LOGIN = 'LOGIN';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_FAILED = 'FETCH_FAILED';

export const actioLogin = (user) => ({
  type: LOGIN,
  user,
});

export const actionFetchSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result,
});

export const actionFetchFailed = (error) => ({
  type: FETCH_FAILED,
  error,
});

export const fetchQuote = () => (dispatch) => (
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => dispatch(actionFetchSuccess(data)))
    .catch((error) => dispatch(actionFetchFailed(error)))
);
