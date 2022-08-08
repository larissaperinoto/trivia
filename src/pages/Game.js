import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import './Game.css';
import getQuestions from '../services/getQuestions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      allQuestions: [],
      correct: '',
      logout: false,
      clicked: false,
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

  btnClick = () => {
    this.setState({ clicked: true });
  }

 btnNext =() => {
   this.requestQuestions();
   this.setState({ clicked: false });
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
    const { data, allQuestions, correct,
      logout, timer, isDisabled, clicked } = this.state;
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
                onClick={ this.btnClick }
                className={ classe }
                disabled={ isDisabled }
              >
                {answer}
              </button>
            );
          }) }
        </div>
        <span>{ timer }</span>
        {clicked
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
        ;
        {logout && <Redirect to="/" />}
      </div>
    );
  }
}

export default Game;
