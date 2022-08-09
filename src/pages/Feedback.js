import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    console.log(assertions);
    const spots = 3;
    return (
      <>
        <Header />
        <div data-testid="feedback-text">
          {assertions < spots
            ? <span>Could be better...</span>
            : <span>Well Done!</span>}
        </div>
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
