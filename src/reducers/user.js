const INITIAL_STATE = { email: '' };

function user(state = INITIAL_STATE, action) {
  if (action.type === 'GET_EMAIL') {
    return {
      ...state,
      email: action.email,
    };
  }
  return state;
}

export default user;
