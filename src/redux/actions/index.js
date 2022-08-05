export const USER_LOGIN = 'USER_LOGIN';

export const userLogin = (name, email) => ({
  type: USER_LOGIN,
  name,
  email,
});
