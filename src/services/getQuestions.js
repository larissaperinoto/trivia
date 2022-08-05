const getQuestions = async () => {
  const token = localStorage.getItem('token');
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

export default getQuestions;
