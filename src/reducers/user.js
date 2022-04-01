import { SET_USERS } from '../actions';

const INITIAL_STATE = { email: '' };

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USERS:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
