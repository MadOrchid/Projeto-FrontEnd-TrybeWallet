import { LOGIN } from '../actions';

// state incial para o store
const INITIAL_STATE = {
  email: '',
};

/* Adiciona um reducer separado para slavar no store o email do usuário que é o que o 1 requisito pede */
function user(state = INITIAL_STATE, { type, email }) {
  /* Desconstrói as infos que vem na action para facilitar, mas a descontrução tem como origem a action */
  switch (type) {
  case LOGIN:
    return {
      ...state,
      email,
    };
    /* Salva somente o email passado pela action pois ao combinar o reducers o nome dessa função user é a c
    have usanda para distinguir os dados. Retorna um novo state para store com o email
    Obs: ...state, para não perder possíveis infos já salvas no state !importante!!! */
  default:
    return state;
  }
}

export default user;
