import exchangeApiFetch from '../services/exchangeApiFetch';

export const LOGIN = 'LOGIN'; // para padronizar cria constante do tipo e exporta para também ser usado no reducer do user
export const GET_EXPENSES = 'GET_EXPENSES';
export const SET_UPDATE_EXPENSES = 'SET_UPDATE_EXPENSES';

/* action que só é disparada ao clicar no botaõ de enviar no formulário de login, recebe o email por parâmetro e envia type,
e o dito cujo email via action para o reducer do user para ser de fato salvo no store */
export const saveEmailLogin = (email) => ({ type: LOGIN, email });
export const getExpenses = (expenses, response) => ({
  type: GET_EXPENSES, expenses, response });

export const setUpdateExpenses = (updateForExpenses) => ({ type: SET_UPDATE_EXPENSES,
  updateForExpenses });

export function fetchCurrencyQuotes(expenses) {
  return async (dispatch) => {
    try {
      const response = await exchangeApiFetch();
      expenses.exchangeRates = response;
      dispatch(getExpenses(expenses));
    } catch (e) {
      console.log(e);
    }
  };
}
