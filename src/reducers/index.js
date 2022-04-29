import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

// Combina os reducer dizendo que o nome do reducer é o mesmo da chave
const rootReducer = combineReducers({ user, wallet });

export default rootReducer;
