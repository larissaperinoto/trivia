import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/Header';
import './Game.css';

class Feedback extends Component {
  componentDidMount() {
    this.handleLocalStorage();
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleLocalStorage = () => {
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
        <div className="feedback-area">
          <div className="details-feedback">
            {assertions < spots
              ? <p className="feedback">Could be better...</p>
              : <p className="feedback">Well Done!</p>}
            <p>
              Número de acertos
              {' '}
              <span
                data-testid="feedback-total-question"
              >
                { assertions }
              </span>
              {' '}
            </p>
            <p>
              Sua pontuação é
              {' '}
              <span
                data-testid="feedback-total-score"
              >
                { score }
              </span>
            </p>
          </div>
          <div className="btn-feedback">
            <button
              type="button"
              className="btn-play-again"
              data-testid="btn-play-again"
              onClick={ () => this.handleClick() }
            >
              Play Again
            </button>
            <Link to="ranking">
              <button
                className="btn-ranking"
                type="button"
                data-testid="btn-ranking"
              >
                Ranking
              </button>
            </Link>
          </div>
        </div>
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
