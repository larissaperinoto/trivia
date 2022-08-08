import { USER_LOGIN, PLAYER_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case PLAYER_SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
};

export default loginReducer;
