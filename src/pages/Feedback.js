import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    this.handleLocasStorage();
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleLocasStorage = () => {
    const { name, assertions, score, gravatarEmail } = this.props;
    const playerData = [{
      name,
      assertions,
      score,
      gravatarEmail,
    }];
    const oldLocasStorage = localStorage.getItem('ranking');
    const oldParsed = JSON.parse(oldLocasStorage);
    if (oldParsed && name !== '') {
      const newLocalStorage = [...oldParsed, ...playerData];
      const newStingfied = JSON.stringify(newLocalStorage);
      localStorage.setItem('ranking', newStingfied);
    } else if (name !== '') {
      const newStingfied = JSON.stringify(playerData);
      localStorage.setItem('ranking', newStingfied);
    }
  }

  render() {
    const { assertions, score } = this.props;
    const spots = 3;
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          {assertions < spots
            ? <span>Could be better...</span>
            : <span>Well Done!</span>}
        </div>
        <div>
          <p>
            Número de acertos:
            {' '}
            <span
              data-testid="feedback-total-question"
            >
              { assertions }
            </span>
            {' '}
          </p>
          <p>
            Sua pontuação é:
            {' '}
            <span
              data-testid="feedback-total-score"
            >
              { score }
            </span>
          </p>
        </div>
        <button
          type="button"
          id="btn-play-again"
          data-testid="btn-play-again"
          onClick={ () => this.handleClick() }
        >
          Play Again
        </button>
        <Link to="ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  ...state.player,
});

Feedback.propTypes = {
  assertions: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
