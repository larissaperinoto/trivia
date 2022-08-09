import {
  USER_LOGIN,
  PLAYER_SCORE,
  PLAYER_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
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
      score: state.score + action.score,
    };
  case PLAYER_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
