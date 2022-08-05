import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import getQuestions from '../services/getQuestions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      questionIndex: {},
      wrongAnswers: [],
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
        questions,
        questionIndex: questions[0],
        wrongAnswers: questions[0].incorrect_answers,
        logout: false,
      });
    } else {
      this.setState({ logout: true });
      localStorage.clear();
    }
  }

  render() {
    const { logout, questions, questionIndex, wrongAnswers } = this.state;
    console.log(questionIndex);
    console.log(questions);
    console.log(wrongAnswers);
    return (
      <div>
        <Header />
        <div>
          <p data-testid="question-category">{questionIndex.category}</p>
          <p data-testid="question-text">{questionIndex.question}</p>
          <div data-testid="answer-options">
            <button
              data-testid="correct-answer"
              type="button"
            >
              {questionIndex.correct_answer}
            </button>
            {wrongAnswers.map((answer, i) => (
              <button
                key={ i }
                type="button"
                data-testid={ `wrong-answer-${i}` }
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
        {logout && <Redirect to="/" />}
      </div>
    );
  }
}

export default Game;
