const getToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  localStorage.setItem('token', data.token);
};

export default getToken;
