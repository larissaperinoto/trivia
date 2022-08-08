import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { playerScore as playerScoreAction } from '../redux/actions';
import getQuestions from '../services/getQuestions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      allQuestions: [],
      correct: '',
      logout: false,
      timer: 30,
      isDisabled: false,
    };
  }

  componentDidMount() {
    this.requestQuestions();
  }

  requestQuestions = async () => {
    const questions = await getQuestions();
    const number = 0.5;
    if (questions.length > 0) {
      this.setState({
        data: questions[0],
        allQuestions: [questions[0].correct_answer,
          ...questions[0].incorrect_answers].sort(() => Math.random() - number),
        correct: questions[0].correct_answer,
        logout: false,
      }, () => this.timerCount());
    } else {
      this.setState({ logout: true });
      localStorage.clear();
    }
  }

  handleClick = () => {

  }

  timerCount = () => {
    const functionTime = 1000;
    const getInterval = setInterval(() => {
      const { timer } = this.state;
      this.setState({ timer: (timer - 1) }, () => {
        if (timer === 1) {
          clearInterval(getInterval);
          this.setState({ isDisabled: true });
        }
      });
    }, functionTime);
  }

  render() {
    const { data, allQuestions, correct, logout, timer, isDisabled } = this.state;
    return (
      <div>
        <Header />
        <p data-testid="question-category">{ data.category }</p>
        <p data-testid="question-text">{ data.question }</p>
        <div data-testid="answer-options">
          { allQuestions.map((answer, index) => {
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
                disabled={ isDisabled }
                onClick={ (event) => this.handleClick(event) }
              >
                {answer}
              </button>
            );
          }) }
        </div>
        <span>{ timer }</span>
        {logout && <Redirect to="/" />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  playerScore: (score) => dispatch(playerScoreAction(score)),
});

export default connect(null, mapDispatchToProps)(Game);
