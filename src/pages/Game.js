import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import getQuestions from '../services/getQuestions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      incorrect: [],
      allQuestions: [],
      correct: '',
      logout: false,
    };
  }

  componentDidMount() {
    this.requestQuestions();
  }

  requestQuestions = async () => {
    const questions = await getQuestions();
    if (questions.length > 0) {
      this.setState({
        data: questions[0],
        allQuestions: [questions[0].correct_answer,
          ...questions[0].incorrect_answers].sort(),
        incorrect: [...questions[0].incorrect_answers],
        correct: questions[0].correct_answer,
        logout: false,
      });
    } else {
      this.setState({ logout: true });
      localStorage.clear();
    }
  }

  render() {
    const { data, allQuestions, incorrect, correct, logout } = this.state;
    console.log(data);
    console.log(allQuestions);
    console.log(incorrect);
    console.log(correct);
    return (
      <div>
        <Header />
        <p data-testid="question-category">{ data.category }</p>
        <p data-testid="question-text">{ data.question }</p>
        <div data-testid="answer-options">
          { allQuestions.map((answer, index) => {
            console.log(answer);
            console.log(correct);
            let testid = '';
            if (answer === correct) {
              testid = 'correct-answer';
            } else {
              testid = `wrong-answer-${index}`;
            }
            return (
              <button
                key={ answer }
                type="button"
                data-testid={ testid }
              >
                {answer}
              </button>
            );
          }) }
        </div>
        {logout && <Redirect to="/" />}
      </div>
    );
  }
}

export default Game;
