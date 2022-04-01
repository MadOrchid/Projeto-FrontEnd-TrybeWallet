// Coloque aqui suas actions
export const SET_USERS = 'SET_USERS';
export const WALLET = 'WALLET';

export const setUsersValue = (email) => ({
  type: SET_USERS, email,
});
