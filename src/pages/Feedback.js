import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/Header';

class Feedback extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
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
