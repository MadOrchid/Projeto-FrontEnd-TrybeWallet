import { FETCH_SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: true,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_SUCCESS:
    return {
      ...state,
      currencies: Object.keys(action.result).filter((acronym) => acronym !== 'USDT'),
      isFetching: false,
    };
  default:
    return state;
  }
}
