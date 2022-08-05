const getToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.log(error);
  }
};

export default getToken;
