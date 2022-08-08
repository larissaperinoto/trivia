export const USER_LOGIN = 'USER_LOGIN';
export const PLAYER_SCORE = 'PLAYER_SCORE';

export const userLogin = (name, email) => ({
  type: USER_LOGIN,
  name,
  email,
});

export const playerScore = (score) => ({
  type: PLAYER_SCORE,
  score,
});
