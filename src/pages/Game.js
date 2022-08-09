import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

import { playerScore as playerScoreAction } from '../redux/actions';
import './Game.css';
import getQuestions from '../services/getQuestions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      question: '',
      category: '',
      allAnswers: [],
      correct: '',
      difficulty: '',
      logout: false,
      clicked: false,
      timer: 30,
      isDisabled: false,
      index: 0,
    };
  }

  async componentDidMount() {
    const data = await getQuestions();
    this.setState({ data }, () => this.requestQuestions());
  }

  requestQuestions = () => {
    const { index, data } = this.state;
    const number = 0.5;
    if (data.length > 0) {
      this.setState({
        question: data[index].question,
        category: data[index].category,
        allAnswers: [data[index].correct_answer,
          ...data[index].incorrect_answers].sort(() => Math.random() - number),
        correct: data[index].correct_answer,
        logout: false,
        isDisabled: false,
      }, () => {
        this.timerCount();
        this.getDifficulty(data[index].difficulty);
      });
    } else {
      this.setState({ logout: true });
      localStorage.clear();
    }
  }

  getDifficulty = (difficulty) => {
    const hard = 3;
    const medium = 2;
    if (difficulty === 'hard') {
      this.setState({ difficulty: hard });
    } else if (difficulty === 'medium') {
      this.setState({ difficulty: medium });
    } else {
      this.setState({ difficulty: 1 });
    }
  }

  handleClick = ({ target: { innerHTML } }) => {
    this.setState({ clicked: true });
    const { correct, timerId } = this.state;
    if (correct === innerHTML) {
      const { timer, difficulty } = this.state;
      const { playerScore } = this.props;
      const point = 10;
      const score = point + (timer * difficulty);
      playerScore(score);
    }
    clearInterval(timerId);
  }

  btnNext = () => {
    const maxQuestion = 5;
    this.setState((prevState) => ({
      clicked: false,
      index: prevState.index === maxQuestion ? 0 : (prevState.index + 1),
      timer: 30,
    }), () => {
      this.requestQuestions();
    });
  }

  timerCount = () => {
    const functionTime = 1000;
    const getInterval = setInterval(() => {
      console.log('test');
      const { timer } = this.state;
      this.setState({ timer: (timer - 1), timerId: getInterval }, () => {
        if (timer <= 1) {
          clearInterval(getInterval);
          this.setState({ isDisabled: true });
        }
      });
    }, functionTime);
  }

  render() {
    const { question,
      category,
      allAnswers,
      correct,
      logout,
      timer,
      isDisabled,
      clicked } = this.state;

    return (
      <div>
        <Header />
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          { allAnswers.map((answer, index) => {
            let testid = '';
            if (answer === correct) {
              testid = 'correct-answer';
            } else {
              testid = `wrong-answer-${index}`;
            }
            let classe = '';
            if (clicked) {
              if (testid === 'correct-answer') {
                classe = 'correctAnswer';
              } else { classe = 'incorrectAnswer'; }
            }
            return (
              <button
                key={ answer }
                type="button"
                data-testid={ testid }
                className={ classe }
                disabled={ isDisabled }
                onClick={ (event) => this.handleClick(event) }
              >
                {answer}
              </button>
            );
          }) }
        </div>
        {/* <span>{ timer }</span> */}
        {/* Alternativa, faz timer sumir quando tempo acaba ou resposta é selecionada */}

        {(!isDisabled && !clicked) && (<span>{ timer }</span>)}
        {(clicked || isDisabled)
         && (
           <label htmlFor="btn-next">
             <button
               type="button"
               data-testid="btn-next"
               onClick={ this.btnNext }
             >
               {'Next '}
             </button>
           </label>)}

        {logout && <Redirect to="/" />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  playerScore: (score) => dispatch(playerScoreAction(score)),
});

Game.propTypes = {
  playerScore: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Game);
