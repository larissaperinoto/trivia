import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';

import {
  playerScore as playerScoreAction,
  playerAssertions as playerAssertionsAction } from '../redux/actions';
import './Game.css';
import getQuestions from '../services/getQuestions';

const maxQuestion = 4;

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

  componentDidMount() {
    this.reloadDataQuestions();
  }

  componentWillUnmount() {
    this.timerCount();
  }

  reloadDataQuestions = async () => {
    const data = await getQuestions();
    this.setState({ data }, () => this.requestQuestions());
  }

  requestQuestions = () => {
    const { index, data } = this.state;
    const number = 0.5;
    if (data.length > 0 && index <= maxQuestion) {
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
      localStorage.removeItem('token');
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
      const { playerScore, playerAssertions } = this.props;
      const point = 10;
      const score = point + (timer * difficulty);
      playerScore(score);
      playerAssertions();
    }
    clearInterval(timerId);
  }

  btnNext = () => {
    this.setState((prevState) => ({
      clicked: false,
      index: prevState.index <= maxQuestion ? (prevState.index + 1) : 0,
      timer: 30,
    }), () => {
      this.requestQuestions();
    });
  }

  timerCount = () => {
    const functionTime = 1000;
    const getInterval = setInterval(() => {
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
      clicked,
      index } = this.state;
    return (
      <>
        <Header />
        <div className="game-area">
          <div className="area-answers" data-testid="answer-options">
            <div className="question-area">
              <p data-testid="question-category">{ category }</p>
              <p data-testid="question-text">{ question }</p>
            </div>
            { allAnswers.map((answer, i) => {
              let testid = '';
              if (answer === correct) {
                testid = 'correct-answer';
              } else {
                testid = `wrong-answer-${i}`;
              }
              let classe = 'resposta';
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
          <div className="right-elements">
            {(!isDisabled && !clicked) && (<span className="timer-area">{ timer }</span>)}
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
            { index > maxQuestion && <Redirect to="/feedback" /> }
          </div>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  playerScore: (score) => dispatch(playerScoreAction(score)),
  playerAssertions: () => dispatch(playerAssertionsAction()),
});

Game.propTypes = {
  playerScore: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Game);
