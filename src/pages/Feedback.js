import React from 'react';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
    };
  }

  handleClick = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { assertions } = this.props;
    const { redirect } = this.state;
    const spots = 3;
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          {assertions < spots
            ? <span>Could be better...</span>
            : <span>Well Done!</span>}
        </div>
        <button
          type="button"
          id="btn-play-again"
          data-testid="btn-play-again"
          onClick={ () => this.handleClick() }
        >
          Play Again
        </button>
        { redirect && <Redirect to="/" /> }
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
