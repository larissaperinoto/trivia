export const USER_LOGIN = 'USER_LOGIN';
export const PLAYER_SCORE = 'PLAYER_SCORE';
export const PLAYER_ASSERTIONS = 'PLAYER_ASSERTIONS';

export const userLogin = (name, email) => ({
  type: USER_LOGIN,
  name,
  email,
});

export const playerScore = (score) => ({
  type: PLAYER_SCORE,
  score,
});

export const playerAssertions = () => ({
  type: PLAYER_ASSERTIONS,
});
